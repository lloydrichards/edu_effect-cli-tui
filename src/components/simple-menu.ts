/**
 * Simple Menu Component
 *
 * Demonstrates a basic vertical menu with header and menu items.
 */

import * as Box from "../Box";

export const menu = Box.text("Main Menu").pipe(
  Box.vAppend(Box.text("-".repeat(20))),
  Box.vAppend(Box.text("1. Start Application")),
  Box.vAppend(Box.text("2. View Settings")),
  Box.vAppend(Box.text("3. Check Status")),
  Box.vAppend(Box.text("4. Exit"))
);

// Enhanced menu with descriptions using Box.para
const createMenuItemWithDescription = (
  number: string,
  title: string,
  description: string
) => {
  return Box.text(`${number}. `).pipe(
    Box.hAppend(Box.text(title)),
    Box.vAppend(Box.para(`   ${description}`, Box.left, 35)),
    Box.vAppend(Box.text(""))
  );
};

export const detailedMenu = Box.vcat(
  [
    Box.text("Application Menu"),
    Box.text("═".repeat(40)),
    Box.text(""),
    createMenuItemWithDescription(
      "1",
      "Start Application",
      "Launch the main application with default configuration settings"
    ),
    createMenuItemWithDescription(
      "2",
      "View Settings",
      "Configure application preferences, themes, and system options"
    ),
    createMenuItemWithDescription(
      "3",
      "Check Status",
      "View system health, connection status, and performance metrics"
    ),
    createMenuItemWithDescription(
      "4",
      "Help & Support",
      "Access documentation, tutorials, and technical support resources"
    ),
    createMenuItemWithDescription(
      "5",
      "Exit",
      "Close the application and save current session state"
    ),
    Box.text("─".repeat(40)),
    Box.text("Use arrow keys to navigate, Enter to select"),
  ],
  Box.left
);
