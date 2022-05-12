import { describe, test, expect } from "vitest";
import { shallowMount } from "@vue/test-utils";
import VButton from "@/components/VButton.vue";

describe("VButton", () => {
  test("should be visible", () => {
    const wrapper = shallowMount(VButton, {
      props: {
        content: "Login",
        dataCy: "login",
      },
    });

    wrapper.find("button").trigger("click");

    expect(wrapper.isVisible()).toBe(true);
    expect(wrapper.emitted().click).toBeTruthy();
    expect(wrapper.find("button").element.innerHTML).toBe(" Login");
    expect(wrapper.find("button").element.dataset.cy).toBe("login");
  });
});
