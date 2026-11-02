/**
 * TokenService — tokens individuais dos participantes.
 *
 * O Hub guarda só o hash SHA-256 do token (participant.token_hash). O token em claro aparece
 * uma única vez para o instrutor, no momento em que é gerado.
 */
var TokenService = Class.create();

TokenService.PARTICIPANT_TABLE = 'x_1556735_dlhub_participant';

TokenService.prototype = {
    initialize: function () {},

    /** Gera um token novo (64 caracteres hex). */
    generate: function () {
        var raw = '';
        try {
            // Disponível em boa parte das releases; se não estiver no escopo, cai no GUID.
            raw = GlideSecureRandomUtil.getSecureRandomString(48);
        } catch (e) {
            raw = '';
        }
        // Mistura com GUIDs e passa pelo SHA-256 para ter formato fixo.
        return this.hash(raw + gs.generateGUID() + gs.generateGUID() + new GlideDateTime().getNumericValue());
    },

    /** SHA-256 em hexadecimal minúsculo. */
    hash: function (text) {
        return String(new GlideDigest().getSHA256Hex(String(text))).toLowerCase();
    },

    /**
     * Gera um token novo para o participante, grava o hash e devolve o token em claro.
     * @param {GlideRecord} participantGr registro de participant (não chama update se insert=true)
     * @param {boolean} insideBeforeRule true quando chamado de uma BR before (não chama update)
     */
    issue: function (participantGr, insideBeforeRule) {
        var token = this.generate();
        participantGr.setValue('token_hash', this.hash(token));
        if (!insideBeforeRule) participantGr.update();
        return token;
    },

    /**
     * Encontra o participante ativo dono do token.
     * @returns {GlideRecord|null}
     */
    findParticipant: function (token) {
        if (!token || typeof token !== 'string' || token.length < 16 || token.length > 256) return null;
        var gr = new GlideRecord(TokenService.PARTICIPANT_TABLE);
        gr.addQuery('token_hash', this.hash(token.trim()));
        gr.addQuery('active', true);
        gr.setLimit(1);
        gr.query();
        return gr.next() ? gr : null;
    },

    type: 'TokenService',
};
