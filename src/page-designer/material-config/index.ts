import alert from './alert.json';
import avatar from './avatar.json';
import breadcrumb from './breadcrumb.json';
import button from './button.json';
import card from './card.json';
import carousel from './carousel.json';
import collapse from './collapse.json';
import descriptions from './descriptions.json';
import divider from './divider.json';
import empty from './empty.json';
import icon from './icon.json';
import progress from './progress.json';
import result from './result.json';
import statistic from './statistic.json';
import steps from './steps.json';
import tabs from './tabs.json';
import tag from './tag.json';
import timeline from './timeline.json';
import row from './row.json';
import col from './col.json';
import blockQuote from './block-quote.json';

export default {
  base: [
    alert,
    avatar,
    breadcrumb,
    button,
    descriptions,
    divider,
    empty,
    icon,
    progress,
    result,
    statistic,
    steps,
    tabs,
    tag,
    timeline,
    card,
  ],
  advance: [carousel, collapse],
  layout: [row, col, blockQuote],
};
