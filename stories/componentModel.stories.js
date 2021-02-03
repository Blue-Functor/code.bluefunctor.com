
import { Description, createMainStory, generateStory } from '../packages/library-template-utils';

import { componentModel } from '../packages/code-component-model';
import { version } from '../packages/code-component-model/package.json';

const story = createMainStory({
  title: 'NEW/componentModel',
  component: componentModel,
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

const Template = (args) => <componentModel {...args} />;

const Greeting = generateStory({
    Template,
    props: {},
});

export { Greeting };
export default story;
