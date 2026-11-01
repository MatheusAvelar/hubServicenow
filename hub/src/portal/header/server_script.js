// Header do portal do Hub. Headers/footers NÃO usam IIFE (o contexto do sp_header_footer exige statements soltos).
var currentPage = $sp.getParameter('id') || 'x_1556735_dlhub_painel';
data.nav = [
    { label: 'Painel', href: '?id=x_1556735_dlhub_painel', target: '_self', active: currentPage === 'x_1556735_dlhub_painel' },
    { label: 'Atividades', href: '/x_1556735_dlhub_activity_list.do', target: '_blank', active: false },
    { label: 'Trilhas', href: '/x_1556735_dlhub_track_list.do', target: '_blank', active: false },
    { label: 'Participantes', href: '/x_1556735_dlhub_participant_list.do', target: '_blank', active: false },
];
