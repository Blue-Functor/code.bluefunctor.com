
import { Description, createMainStory, generateStory } from '../packages/library-template-utils';

import { version } from '../packages/code-component-model/package.json';

const story = createMainStory({
  title: 'NEW/componentModel',
  component: () => {},
  description: (
      <Description
          name="componentModel"
          description=""
          packageUrl="https://www.npmjs.com/package/@bluefunctor/code-component-model"
          installCommand="@bluefunctor/code-component-model"
          version={version}
      />
  ),
});

export default story;
