# UI-AI Library

A simple and easy-to-use library built with Next.js, custom components, and the Ollama JavaScript library. This library includes the following components:

- **ELIF5 Component**
- **Summarize Component**
- **Semantic Search Box Component**

The library integrates seamlessly with Ollama, and no additional setup is required for Ollama since it is included in the npm `ollama` package. Ollama is also configured to run locally for a smooth development experience.

## Features

- **ELIF5 Component**: [Brief description of what this component does]
- **Summarize Component**: [Brief description of what this component does]
- **Semantic Search Box Component**: [Brief description of what this component does]

## Installation

To use this library, simply install it via npm:

```bash
npm install ui-ai
```

## Usage

Once the package is installed, you can start using the components. Here's an example of how to use each one:

### ELIF5 Component

```javascript
import { ELIF5 } from 'ui_ai';

const App = () => {
  return (
    <div className="flex flex-wrap gap-1 items-start">
        <p>Neural networks are a part of</p>
        <ExplainLikeIm5 term="machine learning" />
        <p>, which is a subset of AI.</p>
      </div>
  );
};
```

### Summarize Component

```javascript
import { Summarize } from 'ui_ai';

const App = () => {
  return (
    <div>
      <AutoSummaryCard/>
    </div>
  );
};
```


### Semantic Search Box Component

```javascript
import { SemanticSearchBox } from 'ui_ai';

const App = () => {
  return (
    <div>
      <SemanticSearchBox />
    </div>
  );
};
```
## Requirements

- Node.js (v12 or later)
- npm (v6 or later)
- Ollama (already bundled in the package)

## How It Works

The library integrates directly with Ollama, providing the easiest way to get up and running with AI-driven features. Ollama is already running locally, so you don’t need to set up or configure it separately.

## Contributing

Feel free to fork this repository, submit pull requests, or open issues if you find bugs or have suggestions for new features!
