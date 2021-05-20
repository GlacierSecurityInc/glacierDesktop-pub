import { __ } from '../i18n';
import { html } from "lit-html";
import avatar from "./avatar.js";
import { modal_close_button, modal_header_close_button } from "./buttons"

export default (o) => {
    const i18n_address = __('XMPP Address');
    const i18n_email = __('Email');
    const i18n_full_name = __('Full Name');
    const i18n_nickname = __('Nickname');
    const i18n_profile = __('The User\'s Profile Image');
    const i18n_refresh = __('Refresh');
    const i18n_role = __('Role');
    const i18n_url = __('URL');
    const avatar_data = {
        'alt_text': i18n_profile,
        'extra_classes': 'mb-3',
        'height': '120',
        'width': '120'
    };

    const jidUsername = o.jid.split('@')[0];

    return html`
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="user-details-modal-label">${o.display_name}</h5>
                    ${modal_header_close_button}
                </div>
                <div class="modal-body">
                    ${ o.image ? html`<div class="mb-4">${avatar(Object.assign(o, avatar_data))}</div>` : '' }
                    <p><a href="xmpp:${o.jid}">${o.nickname || ''}@${jidUsername}</a></p>
                    ${ o.fullname ? html`<p><label>${i18n_full_name}:</label> ${o.fullname}</p>` : '' }
                    ${ o.nickname ? html`<p><label>${i18n_nickname}:</label> ${o.nickname}</p>` : '' }
                    ${ o.url ? html`<p><label>${i18n_url}:</label> <a target="_blank" rel="noopener" href="${o.url}">${o.url}</a></p>` : '' }
                    ${ o.email ? html`<p><label>${i18n_email}:</label> <a href="mailto:${o.email}">${o.email}</a></p>` : '' }
                    ${ o.role ? html`<p><label>${i18n_role}:</label> ${o.role}</p>` : '' }
                </div>
                <div class="modal-footer">
                    ${modal_close_button}
                    <button type="button" class="btn btn-info refresh-contact"><i class="fa fa-refresh"> </i>${i18n_refresh}</button>
                </div>
            </div>
        </div>
    `;
}
