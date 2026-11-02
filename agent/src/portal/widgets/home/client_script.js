api.controller = function ($timeout, $window) {
    var c = this;
    c.busy = '';
    c.config = { hub_url: '', hub_user: '', hub_password: '', participant_token: '' };
    c.showConfig = false;

    function call(action, extra) {
        c.busy = action;
        c.data.action = action;
        c.data.number = extra && extra.number ? extra.number : null;
        c.data.config = extra && extra.config ? extra.config : null;
        return c.server.update().then(function () {
            c.busy = '';
            c.data.action = null;
            c.data.config = null; // nunca manter senha/token no estado do widget
        }, function () {
            c.busy = '';
            c.data.action = null;
            c.data.config = null;
            c.data.notice = { ok: false, message: 'Não foi possível falar com a sua instância. Recarregue a página.' };
        });
    }

    // Depois de pedir sincronização, atualiza o status sozinho (o pull/flush roda em segundo plano).
    function refreshSoon() {
        [5000, 15000].forEach(function (ms) {
            $timeout(function () {
                if (c.busy) return;
                var notice = c.data.notice;
                call('refresh').then(function () { c.data.notice = notice; });
            }, ms);
        });
    }

    c.select = function (number) {
        if (c.busy || number === c.data.selected) return;
        c.data.selected = number;
        call('refresh');
    };

    c.approve = function (activity) {
        var preview = c.data.detail && c.data.detail.number === activity.number ? (c.data.detail.setup_preview || []) : [];
        var text = 'Aprovar e instalar ' + activity.number + '?';
        if (preview.length) text += '\n\nO setup vai criar na sua instância:\n- ' + preview.join('\n- ');
        if (!$window.confirm(text)) return;
        call('approve', { number: activity.number }).then(refreshSoon);
    };

    c.validate = function (activity) {
        call('validate', { number: activity.number }).then(refreshSoon);
    };

    c.sync = function () {
        call('sync').then(refreshSoon);
    };

    c.saveConfig = function () {
        call('configure', { config: angular.copy(c.config) }).then(function () {
            c.config.hub_password = '';
            c.config.participant_token = '';
            if (c.data.notice && c.data.notice.ok) c.showConfig = false;
            refreshSoon();
        });
    };

    c.badgeClass = function (state) {
        return {
            new: 'dl-badge-new',
            approved: 'dl-badge-progress',
            in_progress: 'dl-badge-progress',
            completed: 'dl-badge-done',
        }[state] || 'dl-badge-progress';
    };

    c.statusIcon = function (status) {
        return { pass: '✓', fail: '✕', none: '–' }[status];
    };

    c.statusLabel = function (status) {
        return { pass: 'Aprovado', fail: 'Reprovado', none: 'Não enviado' }[status];
    };
};
