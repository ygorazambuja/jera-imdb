import { describe, test, expect } from "vitest";
import { shallowMount } from "@vue/test-utils";
import VInput from "@/components/VInput.vue";

describe("VInput", () => {
  test("should be visible", () => {
    const wrapper = shallowMount(VInput, {
      props: {
        label: "Login",
        modelValue: "name",
        dataCy: "login",
      },
    });

    expect(wrapper.isVisible()).toBe(true);
    wrapper.find("input").setValue("ygoazambuja");
    wrapper.vm.$emit("input", "ygoazambuja");

    expect(wrapper.find("input").element.value).toBe("ygoazambuja");
    expect(wrapper.emitted().input).toBeTruthy();
    expect(wrapper.find("label").element.innerHTML).toBe("Login");
    expect(wrapper.find("input").element.dataset.cy).toBe("login");
    expect(wrapper.emitted()["update:modelValue"][0]).toContain("ygoazambuja");
  });
});
