import { mount } from "@vue/test-utils";
import CheckBox from './CheckBox.vue';
// import { mountWithProps } from '../test-setup';

const propsData = {
    isChecked: false,
    checkboxId: "47",
};

test('renders Check Box', async () => {
    const wrapper = mount(CheckBox, { propsData });

    const input = wrapper.get('[data-test="input"]');
    const label = wrapper.get('[data-test="label"]');

    expect(input.classes()).toContain('hidden');
    expect(label.isVisible()).toBeTruthy();
});

test('toggle Emits update event', async () => {
    const wrapper = mount(CheckBox, { propsData });

    const label = wrapper.get('[data-test="label"]');
    const input = wrapper.get('[data-test="input"]');
    expect(input.attributes()).toHaveProperty('value', 'false');
    await label.trigger('click');

    expect(wrapper.emitted('update:isChecked')).toBeDefined();
    expect(wrapper.emitted('update:isChecked').length).toBe(1);
    expect(wrapper.emitted('update:isChecked')[0]).toEqual([]);
});

test('changing Prop updates checkbox', async () => {
    const wrapper = mount(CheckBox, { propsData });

    const input = wrapper.get('[data-test="input"]');
    expect(input.attributes()).toHaveProperty('value', 'false');
    await wrapper.setProps({ isChecked: true });
    expect(input.attributes()).toHaveProperty('value', 'true');
});