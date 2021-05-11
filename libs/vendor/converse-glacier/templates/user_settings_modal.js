import '../components/adhoc-commands.js';
import { __ } from '../i18n';
import { api } from "@converse/headless/converse-core";
import { html } from "lit-html";
import { modal_header_close_button } from "./buttons"
import metadata from "../../../../../app/metadata.json"

const tpl_navigation = () => {
    const i18n_about = __('About');
    return html`
        <ul class="nav nav-pills justify-content-center">
            <li role="presentation" class="nav-item">
                <a class="nav-link active" id="about-tab" href="#about-tabpanel" aria-controls="about-tabpanel" role="tab" data-toggle="tab">${i18n_about}</a>
            </li>
        </ul>
    `;
}


export default (o) => {
    const i18n_modal_title = __('Settings');
    const show_client_info = api.settings.get('show_client_info');
    const allow_adhoc_commands = api.settings.get('allow_adhoc_commands');
    const show_both_tabs = show_client_info && allow_adhoc_commands;
    return html`
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="converse-modtools-modal-label">${i18n_modal_title}</h5>
                ${modal_header_close_button}
            </div>
            <div class="modal-body">
                ${ tpl_navigation() }

                <div class="tab-content">
                    <div class="tab-pane tab-pane--columns ${show_client_info ? 'active' : ''}"
                         id="about-tabpanel" role="tabpanel" aria-labelledby="about-tab">

                        <span class="modal-alert"></span>
                        <br/>
                        <div class="container">
                            <h6 style="font-size: 2em;">Glacier</h6>
                            <p class="brand-subtitle">v${metadata.appVersion}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
`};
