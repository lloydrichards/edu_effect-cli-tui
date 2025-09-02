/**
 * Simple Text Display - Basic Text Rendering
 *
 * Demonstrates basic text display functionality for single and multi-line text.
 */

import { Box } from "../Box";

export const simpleText = Box.text("Hello, Terminal User Interface!");

export const multilineText = Box.text(`Welcome to the CLI
This is line 2
And this is line 3`);
