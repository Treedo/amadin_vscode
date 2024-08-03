# Amadin VSCode Extension

The Amadin VSCode Extension enhances your development workflow by providing a streamlined interface for managing Amadin framework configurations directly within Visual Studio Code. Easily handle configurations for directories, documents, and tables with this powerful tool.

## Features

- **Intuitive Configuration Management**: View and manage your Amadin configurations directly in the VSCode file tree.
- **Automatic Module Detection**: The extension automatically detects available modules (directories, documents, tables) from the `modules` directory.
- **Enhanced Productivity**: Simplifies the creation and management of configuration files with an integrated VSCode experience.

## Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/amadin-vscode-extension.git
   cd amadin-vscode-extension
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run the Extension**
   - Open the project in VSCode.
   - Press `F5` to launch a new VSCode window with the extension enabled.

## Usage

### View Configurations

Once activated, navigate to the VSCode file explorer to view and manage your Amadin configurations. The extension will display available configuration modules based on the files in the `modules` directory.

### Create New Modules

Add new configuration files to the `modules` directory of your project to create new modules. Modules can be directories, documents, or tables, each with its own configuration file format.

## Development

### Compile the Code

To compile TypeScript into JavaScript, run:
```bash
npm run compile
```

### Lint the Code

Use ESLint to check for code issues:
```bash
npm run lint
```

### Add New Features

Modify or add new files in the [`src`] directory and compile the code.

### Test the Extension

Test the extension in a new VSCode window by pressing `F5`.

## Publishing

### Package the Extension

To package the extension into a `.vsix` file, run:
```bash
vsce package
```

### Publish to VSCode Marketplace

Follow the instructions on the VSCode Marketplace to publish your extension.

## License

This project is licensed under the Apache License 2.0. See the LICENSE file for details.

## Contact

Author, GitHub: Treedo  
Email: s@treedo.name