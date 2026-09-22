/** @odoo-module **/

import { CharField, charField } from "@web/views/fields/char/char_field";
import { registry } from "@web/core/registry";
import { onMounted, onPatched, onWillDestroy } from "@odoo/owl";

// Modern browsers size the input to its content with CSS (see the
// openeducat_core.InlineCharField template); measure in JS only otherwise.
const HAS_FIELD_SIZING = window.CSS?.supports?.("field-sizing", "content");

export class InlineCharField extends CharField {
    static template = 'openeducat_core.InlineCharField';

    setup() {
        super.setup();
        if (HAS_FIELD_SIZING) {
            return;
        }
        onMounted(() => this._resizeInput());
        onPatched(() => this._resizeInput());
        onWillDestroy(() => {
            cancelAnimationFrame(this._resizeFrame);
            if (this._sizer) {
                this._sizer.remove();
                this._sizer = null;
            }
        });
    }

    onInputType() {
        if (!HAS_FIELD_SIZING) {
            this._resizeInput();
        }
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
        if (!input || !input.isConnected) {
            // not in the document yet: measure on the next frame
            cancelAnimationFrame(this._resizeFrame);
            this._resizeFrame = requestAnimationFrame(() => this._resizeInput());
            return;
        }

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
