import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

//simply json adapter
configure({ adapter: new Adapter() });