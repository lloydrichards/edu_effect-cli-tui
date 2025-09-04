/**
 * Simple Menu Component
 *
 * Demonstrates a basic vertical menu with header and menu items.
 */

import * as Box from "../Box";

export const menu = Box.vcat(
  [
    Box.text("Main Menu"),
    Box.text("-".repeat(20)),
    Box.text("1. Start Application"),
    Box.text("2. View Settings"),
    Box.text("3. Check Status"),
    Box.text("4. Exit"),
  ],
  Box.left
);

// Enhanced menu with descriptions using Box.para
const createMenuItemWithDescription = (
  number: string,
  title: string,
  description: string
) => {
  return Box.vcat(
    [
      Box.hcat([Box.text(`${number}. `), Box.text(title)], Box.top),
      Box.para(`   ${description}`, Box.left, 35),
      Box.text(""),
    ],
    Box.left
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
