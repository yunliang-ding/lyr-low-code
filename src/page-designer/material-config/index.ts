import text from './typography/text.json';
import link from './typography/link.json';
import title from './typography/title.json';
import alert from './alert.json';
import button from './button.json';
import card from './card.json';
import carousel from './carousel.json';
import collapse from './collapse.json';
import descriptions from './descriptions.json';
import divider from './divider.json';
import empty from './empty.json';
import progress from './progress.json';
import result from './result.json';
import statistic from './statistic.json';
import steps from './steps.json';
import tabs from './tabs.json';
import tag from './tag.json';
import timeline from './timeline.json';
import blockQuote from './block-quote.json';
import crudModelRender from './crud-model-render.json';

export default {
  base: [
    text,
    link,
    title,
    alert,
    button,
    descriptions,
    divider,
    empty,
    progress,
    result,
    statistic,
    steps,
    tabs,
    tag,
    timeline,
    card,
    carousel,
    collapse,
  ],
  advance: [crudModelRender],
  layout: [blockQuote],
};