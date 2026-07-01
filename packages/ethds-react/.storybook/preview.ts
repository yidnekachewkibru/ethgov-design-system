import type { Preview } from '@storybook/react';

// The ETHDS design tokens (CSS custom properties) power every component,
// so load them in the Storybook canvas.
import '@ethds/tokens/css';

const preview: Preview = {
  parameters: {
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
