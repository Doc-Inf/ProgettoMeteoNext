#!/bin/bash

# Step 1: Install necessary dependencies
echo "Installing dependencies..."
npm install

# Define paths as variables

# Temporary directory for sed
TMP_DIR="tmp"

# Paths for sed
ARCHIVE_FORM_PATH="components/archive/archive-form.tsx"
COMPLETE_PAGE_PATH="components/hero/complete-page.tsx"
REPORT_MONTH_PATH="components/report/report-table-month.tsx"
REPORT_YEAR_PATH="components/report/report-table-year.tsx"
REPORT_MORE_PATH="components/report/report-table-more.tsx"

# Other directories
OUT_DIR="out"
APP_PHP_DIR="./app/php"
FONT_DIR="font-dir"
# Testing only
# XAMPP_PATH="/Applications/XAMPP/htdocs/test/"

# Define starting strings for sed
STORICO_START="api/storico?giorno=\${format(date, \"yyyy-MM-dd\")}"
DB_START="api/db"
REPORT_MONTH_START="api/report/month?anno=\${currYear}&mese=\${month}"
REPORT_YEAR_START="api/report/year?anno=\${year}"
REPORT_MORE_START="https://www.itisvallauri.net/meteo4/php/datiReport.php"

# Define replacement strings for sed
STORICO_REPLACEMENT="php/datiStorico.php?giorno=\${format(date, \"yyyy-MM-dd\")}"
DB_REPLACEMENT="php/datiHome.php"
REPORT_MONTH_REPLACEMENT="php/datiReport.php?anno=\${currYear}&mese=\${month}"
REPORT_YEAR_REPLACEMENT="php/datiReport.php?anno=\${year}"
REPORT_MORE_REPLACEMENT="https://www.itisvallauri.net/meteo/php/datiReport.php"

# Get user's OS
OS=$OSTYPE
echo "Detected OS: $OS"

# Step 2: Create temporary directory:
echo "Creating temporary directory..."
mkdir "$TMP_DIR" || {
  echo "Failed to create temporary directory"
  exit 1
}

if [[ "$OS" == "darwin"* ]]; then
  # macOS
  cp -R ./* "$TMP_DIR" || {
    echo "Failed to copy files to temporary directory"
    exit 1
  }
elif [[ "$OS" == "linux-gnu"* || "$OS" == "msys"* ]]; then
  # Linux and  Windows with Git Bash
  # Copy files to the temporary directory, excluding the tmp directory itself
  find . -mindepth 1 -maxdepth 1 ! -name "$TMP_DIR" -exec cp -r {} "$TMP_DIR/" \; || {
    echo "Failed to copy files to temporary directory"
    exit 1
  }
else
  echo "OS not supported"
  exit 1
fi

cd "$TMP_DIR" || {
  echo "Unable to change directory to $TMP_DIR"
  exit 1
}

# Step 3: Modify specific files
echo "Modifying files..."

if [[ "$OS" == "darwin"* ]]; then
  # macOS
  sed -i '' "s|$STORICO_START|$STORICO_REPLACEMENT|g" "$ARCHIVE_FORM_PATH"
  sed -i '' "s|$DB_START|$DB_REPLACEMENT|g" "$COMPLETE_PAGE_PATH"
  sed -i '' "s|$REPORT_MONTH_START|$REPORT_MONTH_REPLACEMENT|g" "$REPORT_MONTH_PATH"
  sed -i '' "s|$REPORT_YEAR_START|$REPORT_YEAR_REPLACEMENT|g" "$REPORT_YEAR_PATH"
  sed -i '' "s|$REPORT_MORE_START|$REPORT_MORE_REPLACEMENT|g" "$REPORT_MORE_PATH"
elif [[ "$OS" == "linux-gnu"* || "$OS" == "msys"* ]]; then
  # Linux and  Windows with Git Bash
  sed -i "s|$STORICO_START|$STORICO_REPLACEMENT|g" "$ARCHIVE_FORM_PATH"
  sed -i "s|$DB_START|$DB_REPLACEMENT|g" "$COMPLETE_PAGE_PATH"
  sed -i "s|$REPORT_MONTH_START|$REPORT_MONTH_REPLACEMENT|g" "$REPORT_MONTH_PATH"
  sed -i "s|$REPORT_YEAR_START|$REPORT_YEAR_REPLACEMENT|g" "$REPORT_YEAR_PATH"
  sed -i "s|$REPORT_MORE_START|$REPORT_MORE_REPLACEMENT|g" "$REPORT_MORE_PATH"
fi

# Step 4: Build the project
echo "Building the project..."
npm run build || {
  echo "Build failed"
  exit 1
}

# Step 5: Modify absolute links to relative
echo "Modifying absolute links to relative..."

if [[ "$OS" == "darwin"* ]]; then
  LC_ALL=C find "$OUT_DIR" -type f -exec sed -i '' "s|/_next|./_next|g" {} +
elif [[ "$OS" == "linux-gnu"* || "$OS" == "msys"* ]]; then
  LC_ALL=C find "$OUT_DIR" -type f -exec sed -i "s|/_next|./_next|g" {} +
fi

# Step 6: Insert app/php folder into out
echo "Inserting app/php into out..."
cp -R "$APP_PHP_DIR" "$OUT_DIR/"

# Step 7: Insert contents of font-dir into out/_next/static/css
echo "Inserting font-dir contents into out/_next/static/css..."
cp -R $FONT_DIR/* $OUT_DIR/_next/static/css

# Step 8: Move out folder and delete tmp folder
rm -rf "../$OUT_DIR"
mv "./$OUT_DIR/" "../$OUT_DIR" || {
  echo "Failed to move out directory"
  exit 1
}
cd ..

echo "Removing temporary directory..."
rm -rf "$TMP_DIR"

# Testing with XAMPP
# cp -R "$OUT_DIR"/* "$XAMPP_PATH"

echo "Build completed"
