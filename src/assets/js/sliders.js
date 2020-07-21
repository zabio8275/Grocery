window.addEventListener('load', function () {
  
  window.glides = new Glider(document.getElementById('glider-double'), {
    slidesToShow: 3,
    slidesToScroll: 3,
    duration: .30,
    draggable: true,
    dots: '#dots2',
    arrows: {
      prev: '#glider-prev-2',
      next: '#glider-next-2'
    }
  })
});