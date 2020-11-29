import { mount } from '@vue/test-utils';

import App from './App.vue';

test('App mounts', async () => {
    const wrapper = mount(App);
    expect(wrapper.html()).toContain('Répéter');
    expect(wrapper.html()).toContain('Task Num 1');
});