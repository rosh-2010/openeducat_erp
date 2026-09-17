/** @odoo-module **/

import { CharField, charField } from "@web/views/fields/char/char_field";
import { registry } from "@web/core/registry";
import { onMounted, onPatched, onWillDestroy } from "@odoo/owl";

export class InlineCharField extends CharField {
    static template = 'openeducat_core.InlineCharField';

    setup() {
        super.setup();
        onMounted(() => this._resizeInput());
        onPatched(() => this._resizeInput());
        onWillDestroy(() => {
            if (this._sizer) {
                this._sizer.remove();
                this._sizer = null;
            }
        });
    }

    onInputType() {
        this._resizeInput();
    }

    _createSizer() {
        if (!this._sizer) {
            this._sizer = document.createElement("span");
            Object.assign(this._sizer.style, {
                position: "absolute",
                visibility: "hidden",
                whiteSpace: "pre",
            });
            document.body.appendChild(this._sizer);
        }
    }

    _resizeInput() {
        // Odoo 20 (Owl 3): refs are signals, read by calling them
        const input = this.input();
        if (!input) return;

        this._createSizer();
        this._sizer.style.font = getComputedStyle(input).font;
        this._sizer.textContent = input.value || input.placeholder || "";
        // small padding for text, more room for the caret when showing the placeholder
        input.style.width = `${this._sizer.offsetWidth + (input.value ? 4 : 10)}px`;
    }
}

registry.category("fields").add("inline_char", {
    ...charField,
    component: InlineCharField,
});
