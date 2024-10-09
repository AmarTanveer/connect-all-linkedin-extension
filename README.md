# QuickConnect

It is a Chrome extension which automatically send connection requests on LinkedIn. It makes networking easier and faster. You can send connection requests to multiple profiles on LinkedIn with just one click.

## Goal

The primary goal of QuickConnect is to build a Chrome extension using the wxt.dev framework with React to automate connection requests on LinkedIn's "My Network" page.

## Features

- **Automated Connection Requests**: Quickly send connection requests to suggested profiles on LinkedIn.
- **Slider Control**: Users can select the number of profiles to connect with using a slider.
- **Delay Management**: Delayed clicks to prevent account blocks.

## Usage

1. Go to your LinkedIn My Network page [https://www.linkedin.com/mynetwork/grow/]

2. Click on the "Connect with All" button to send connection requests to all visible profiles.

3. Or use the slider to specify the number of profiles you want to connect with.
   
## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/QuickConnect.git
   cd QuickConnect

2. Install dependencies
   ```
   npm install

3. Build
   ```
   npm run build

4. Load the extension in Chrome:
   - Go to chrome://extensions/
   - Enable Developer mode
   - Click on Load unpacked and select the build directory
