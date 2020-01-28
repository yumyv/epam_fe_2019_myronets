(function ($) {
  $.fn.modalWindow = function (options) {
    const clickEvent = (event) => {
      if (!event.target.closest('.modal') ||
        event.target.closest('.modal__close') ||
        event.target.closest('.modal__btn--cancel')) {
        $(this).find('.fade').remove();
      } else if (event.target.closest('.modal__btn--ok')) {
        $(this).find('.fade').remove();
        options.onSuccess();
      }
    };

    const keyEvent = (event) => {
      if (event.key === 'Escape') {
        $(this).find('.fade').remove();
      }
    };

    const onBindEvents = () => {
      $(this).find('.fade').on('click', (event) => clickEvent(event));
      $(document).keyup((event) => keyEvent(event));
    };

    const makeButtons = () => {
      const container = $('<div></div>').addClass('modal__btn-container');
      container.append($('<button></button>').text('Ok').addClass('modal__btn modal__btn--ok secondary-btn'));
      if (options.isAdditionalBtn) {
        container.append($('<button></button>').text('Cancel').addClass('modal__btn modal__btn--cancel secondary-btn'));
      }
      return container;
    };

    const makeWindowElement = () => {
      const window = $('<div></div>').addClass('fade');
      const container = $('<div></div>').addClass('container');
      const row = $('<div></div>').addClass('row');
      const modal = $('<div></div>').addClass(`modal modal--${options.type}`);
      modal
        .append($('<div></div>').addClass('modal__close-container')
          .append($('<div></div>').addClass('modal__close').text('X')));
      modal.append($('<p></p>').text(`${options.text}`).addClass('modal__text'));
      modal.append(makeButtons());
      row.append(modal);
      container.append(row);
      window.append(container);
      $(this).append(window);
    };

    (() => {
      makeWindowElement();
      onBindEvents();
    })();
  };
}(jQuery));
