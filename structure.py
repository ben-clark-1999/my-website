import os

# ======= CONFIG =======
START_DIR = "."  # change if you want to index a subfolder

# Skip these folders anywhere in the tree
EXCLUDE_DIRS = {
    "node_modules", ".git", ".next", ".vercel", ".turbo", ".cache",
    ".pnpm-store", ".yarn", "coverage", ".pytest_cache", ".mypy_cache",
    ".gradle", "build", "target"
}

# Consider a directory "too big" if it has more than this many entries (dirs + files)
MAX_ENTRIES_THRESHOLD = 500

# If a dir is "too big", list at most this many subdirs/files (each) and summarize the rest
SHOW_MAX_DIRS = 60
SHOW_MAX_FILES = 120

# Whether to skip hidden directories like ".something" (most heavy dirs are already in EXCLUDE_DIRS)
EXCLUDE_HIDDEN_DIRS = False

OUTPUT_FILE = "structure.txt"
# ======================

def is_hidden(name: str) -> bool:
    return name.startswith(".")

def write_line(f, depth, text):
    f.write("{}{}\n".format("    " * depth, text))

with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
    for root, dirs, files in os.walk(START_DIR, topdown=True, followlinks=False):
        # Compute depth and display name
        rel = os.path.relpath(root, START_DIR)
        depth = 0 if rel == "." else rel.count(os.sep) + 0
        folder_name = "." if rel == "." else os.path.basename(root)

        # Filter out excluded / hidden dirs in-place so os.walk won't visit them
        dirs[:] = [
            d for d in sorted(dirs)
            if d not in EXCLUDE_DIRS and (not EXCLUDE_HIDDEN_DIRS or not is_hidden(d))
        ]

        # Sort files for stable output
        files = sorted(files)

        # Count total entries to decide whether to truncate listing
        total_entries = len(dirs) + len(files)

        # Write the folder header
        write_line(f, depth, f"{folder_name}/")

        show_dirs = dirs
        show_files = files
        omitted_dirs = 0
        omitted_files = 0

        if total_entries > MAX_ENTRIES_THRESHOLD:
            # Truncate what we list and what we traverse into
            if len(dirs) > SHOW_MAX_DIRS:
                omitted_dirs = len(dirs) - SHOW_MAX_DIRS
                show_dirs = dirs[:SHOW_MAX_DIRS]
            if len(files) > SHOW_MAX_FILES:
                omitted_files = len(files) - SHOW_MAX_FILES
                show_files = files[:SHOW_MAX_FILES]

            # IMPORTANT: limit traversal to the subdirs we decided to show
            dirs[:] = show_dirs

        # List files under this folder (directories themselves will be printed when os.walk enters them)
        for name in show_files:
            write_line(f, depth + 1, name)

        # If we truncated, add a summary line
        if omitted_dirs or omitted_files:
            parts = []
            if omitted_dirs:
                parts.append(f"{omitted_dirs} subdir(s)")
            if omitted_files:
                parts.append(f"{omitted_files} file(s)")
            write_line(f, depth + 1, f"... [omitted {', '.join(parts)}]")

print(f"Wrote {OUTPUT_FILE}")
