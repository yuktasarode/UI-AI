# AI-enhanced UI Library

A simple and easy-to-use library built with Next.js, custom components, and the Ollama JavaScript library. This library includes the following components:

- **ELI5 Component**
- **Summarize Component**
- **Semantic Search Box Component**

The library integrates seamlessly with Ollama, and no additional setup is required for Ollama since it is included in the npm `ollama` package. Ollama is also configured to run locally for a smooth development experience.

## Features

- **ELI5 Component**: Explain any term.
- **Summarize Component**: Summarize any uploaded content.
- **Semantic Search Box Component**: Search given PDFs for text and answer questions based on that. Built a privacy-first AI tool with a multi-agent RAG pipeline using Next.js and Ollama for offline document analysis.
Engineered a structured data extraction system using PDF.js, storing embeddings in ChromaDB as a vector database.

## Installation

To use this library, simply install it via npm:

```bash
npm install ui-ai
```


## Getting Started

First, run the chorma server:
```bash
cd chromadb
./run_chroma.sh
```

Second, run the development server:
```bash
npm run dev
```

## Usage

Once the package is installed, you can start using the components. Here's an example of how to use each one:

### ELI5 Component

```javascript
import { ELI5 } from 'ui_ai';

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

### Tetsing RAG:

Prompt: Blueberry pie is a pie with a blueberry filling. Blueberry pie is readily made because it does not require pitting or peeling of fruit. It usually has a top and bottom crust. The top crust can be circular, but the pie can also have a crumble crust or no top crust. Blueberry pies are often eaten in the summertime when blueberries are in season in the Northern hemisphere. The purple fox drinks yellow boba tea at 4 pm. Blueberries, both wild ('lowbush') and cultivated ('highbush'), are native to North America. Blueberry pie was first eaten by early American settlers and later the food spread to the rest of the world. A similar earlier pie from England are prepared with bilberries which are known as European Blueberries . It remains a popular dessert in the United States and Canada. Blueberry pie made with wild Maine blueberries is the official state dessert of the U.S. state of Maine. Berry pie, including with blueberries, was documented as early as 1872 in the Appledore Cook Book.

Question: What does the purple animal drink?

## Contributing

Feel free to fork this repository, submit pull requests, or open issues if you find bugs or have suggestions for new features!
