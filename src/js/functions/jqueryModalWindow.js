(function ($) {
  $.fn.modalWindow = function (options) {
    const settings = $.extend({
      type: 'info',
      text: '',
      isAdditionalBtn: false,
      onSuccess: () => {
      },
      isTextArea: false,
      textAreaValue: '',
      textAreaClass: 'modal__textarea',
      isAdditionalInputs: false,
      additionalInputs: [{id: '', value: '', text: ''}],
    }, options);

    const clickEvent = (event) => {
      if (!event.target.closest('.modal') ||
        event.target.closest('.modal__close') ||
        event.target.closest('.modal__btn--cancel')) {
        $(this).find('.fade').remove();
      } else if (event.target.closest('.modal__btn--ok')) {
        settings.onSuccess();
        $(this).find('.fade').remove();
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

    const makeInputs = () => {
      const inputs = document.createDocumentFragment();
      settings.additionalInputs.forEach((input) => {
        $('<p></p>').text(`${input.text}`).addClass('modal__text').appendTo(inputs);
        $('<input>')
          .attr({
            id: `${input.id}`,
          })
          .addClass('modal__input')
          .val(input.value)
          .appendTo(inputs);
      });
      return inputs;
    };

    const makeButtons = () => {
      const container = $('<div></div>').addClass('modal__btn-container');
      container.append($('<button></button>').text('Ok').addClass('modal__btn modal__btn--ok secondary-btn'));
      if (settings.isAdditionalBtn) {
        container.append($('<button></button>').text('Cancel').addClass('modal__btn modal__btn--cancel secondary-btn'));
      }
      return container;
    };

    const makeWindowElement = () => {
      const window = $('<div></div>').addClass('fade');
      const container = $('<div></div>').addClass('container');
      const row = $('<div></div>').addClass('row');
      const modal = $('<div></div>').addClass(`modal modal--${settings.type}`);
      modal
        .append($('<div></div>').addClass('modal__close-container')
          .append($('<div></div>').addClass('modal__close').text('X')));
      modal.append($('<p></p>').text(`${settings.text}`).addClass('modal__text'));
      if (settings.isTextArea) {
        modal.append($('<textarea></textarea>').val(`${settings.textAreaValue}`).addClass(settings.textAreaClass));
      }
      if (settings.isAdditionalInputs) {
        modal.append(makeInputs());
      }
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
