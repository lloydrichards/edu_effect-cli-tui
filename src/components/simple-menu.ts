/**
 * Simple Menu Component
 *
 * Demonstrates a basic vertical menu with header and menu items.
 */

import { Box, left, vcat } from "../Box";

const menuHeader = Box.text("Main Menu");
const menuItems = [
  Box.text("1. Start Application"),
  Box.text("2. View Settings"),
  Box.text("3. Check Status"),
  Box.text("4. Exit"),
];

export const menu = vcat(left, [
  menuHeader,
  Box.text("-".repeat(20)),
  ...menuItems,
]);
