import { create } from 'rxjs-spy';

const spy = create();
spy.log(/.*/);
export default spy;
