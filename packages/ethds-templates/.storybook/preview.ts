import type { Preview } from '@storybook/react';

// Tokens and @ethds/react component styles power every template, so load
// both in the Storybook canvas.
import '@ethds/tokens/css';
import '@ethds/react/styles.css';

const preview: Preview = {
  parameters: {
    layout: 'fullscreen',
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    backgrounds: {
      default: 'white',
      values: [
        { name: 'white', value: '#FFFFFF' },
        { name: 'gray-50', value: '#F6F7F8' },
      ],
    },
  },
};

export default preview;
