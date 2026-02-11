import { defineComponent, ref, computed, PropType } from 'vue';

export const Notification = defineComponent({
  name: 'Notification',
  props: {
    type: { type: String as PropType<'success' | 'error' | 'warning' | 'info'>, default: 'info' },
    message: { type: String, required: true },
    duration: { type: Number, default: 3000 }
  },
  emits: ['close'],
  setup(props, { emit }) {
    const visible = ref(true);
    
    const colors = {
      success: '#52c41a',
      error: '#ff4d4f',
      warning: '#faad14',
      info: '#1890ff'
    };
    
    const style = computed(() => ({
      padding: '12px 16px',
      backgroundColor: colors[props.type],
      color: 'white',
      borderRadius: '4px',
      marginBottom: '8px'
    }));
    
    if (props.duration > 0) {
      setTimeout(() => {
        visible.value = false;
        emit('close');
      }, props.duration);
    }
    
    return { visible, style };
  },
  template: '<div v-if="visible" :style="style">{{ message }}</div>'
});

export const Spinner = defineComponent({
  name: 'Spinner',
  props: {
    size: { type: Number, default: 40 },
    color: { type: String, default: '#1890ff' }
  },
  setup(props) {
    const style = computed(() => ({
      width: props.size + 'px',
      height: props.size + 'px',
      border: '3px solid #f3f3f3',
      borderTop: '3px solid ' + props.color,
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }));
    return { style };
  },
  template: '<div :style="style"></div>'
});

export default { Notification, Spinner };