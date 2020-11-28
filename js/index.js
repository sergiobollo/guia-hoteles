$(function(){
    $("[data-toggle='tooltip']").tooltip();
    $("[data-toggle='popover']").popover();
    $('.carousel').carousel({
        interval: 3000
    });
    $('#suscribirse, #consultas').on('show.bs.modal', function (e) {
        console.log('El modal se esta mostrando');
        $('#suscribirseBtn').removeClass('btn-primary');
        $('#suscribirseBtn').addClass('btn-danger');
        $('#suscribirseBtn').prop('disabled', true);
    });
    $('#suscribirse, #consultas').on('shown.bs.modal', function (e) {
        console.log('El modal se mostró');
    });
    $('#suscribirse, #consultas').on('hide.bs.modal', function (e) {
        console.log('El modal se esta ocultando');
    });
    $('#suscribirse, #consultas').on('hidden.bs.modal', function (e) {
        console.log('El modal se ocultó');
        $('#suscribirseBtn').prop('disabled', false);
        $('#suscribirseBtn').removeClass('btn-danger');
        $('#suscribirseBtn').addClass('btn-primary');
    });
});