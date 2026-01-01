import { useModal, useModalSlot, VueFinalModal, useVfm } from 'vue-final-modal'
import { useEventListener } from '@vueuse/core'
import CmnDialog from '@/components/Dialog/CmnDialog.vue'

const DialogWrap =
  type =>
  (options, modalProps = {}) =>
    new Promise(resolve => {
      const modalId = `modal_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      history.pushState({ modalId }, '')

      const params = {
        component: CmnDialog,
        attrs: {
          type,
          title: options.title || '',
          content: options.msg,
          confirmTxt: options.confirmTxt || '확인',
          cancelTxt: options.cancelTxt || type === 'alert' ? '확인' : '취소',
          ...modalProps,
        },
        content: () =>
          h(
            'div',
            {},
            options.msg.split(/<br\s*\/?>/gi).map(text => h('p', text)),
          ),
      }

      const { open, close } = useModal({
        component: params.component,
        attrs: {
          modalId,
          ...params.attrs,
          close(value = false) {
            resolve(value instanceof Event ? false : value)
            close()
            if (history.state?.modalId === modalId) {
              history.back()
            }
          },
        },
        slots: {
          default: params.content,
        },
      })
      setTimeout(open, 100)
    })

function DialogPopup(component, params, modalProps = {}) {
  return new Promise(resolve => {
    const modalId = `modal_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    history.pushState({ modalId }, '')

    const { open, close } = useModal({
      component: VueFinalModal,
      attrs: {
        modalId,
        contentTransition: 'vfm-slide-down',
        overlayTransition: 'vfm-fade',
        ...modalProps,
      },
      slots: {
        default: useModalSlot({
          component: component?.default || component,
          attrs: {
            ...params,
            close(value = false) {
              resolve(value instanceof Event ? false : value)
              close()
              if (history.state?.modalId === modalId) {
                history.back()
              }
            },
          },
        }),
      },
    })
    setTimeout(open, 100)
  })
}

export const useDialog = {
  alert: DialogWrap('alert'),
  confirm: DialogWrap('confirm'),
  popup: DialogPopup,
}

export function useDialogHistory() {
  const vfm = useVfm()
  useEventListener(window, 'popstate', () => {
    if (vfm.openedModals.length > 0) {
      vfm.close(vfm.openedModals.at(-1).ctx.modalId)
      // vfm.closeAll() // 한번에 다 닫을 땐 이거로
    }
  })
}
