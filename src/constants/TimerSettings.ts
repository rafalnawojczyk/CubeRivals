import { TimerSettingsType } from '../store/timerSettingsStore';

export const DEFAULT_TIMER_SETTINGS: TimerSettingsType = {
    cube: '333',
    hideTime: false,
    hideUi: true,
    showWholeMs: false,
    showEasyAdd: false,
    stickerColors: ['#ffffff', '#fef200', '#06d002', '#0079fe', '#ed1b24', '#ff7f26'],
    inspection: false,
    inspectionTime: 15,
    inspectionAlerts: 'none',
    inspectionVibrationPattern: 'Warning',
    inspectionAudioNumber: 0,
    scrambleBlockPlacement: 'top',
    holdDelay: 500,
    avgThresholds: [5, 12, 50, 100],
    cutEndsInAvgs: true,
};
