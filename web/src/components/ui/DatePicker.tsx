import { useRef } from 'react';
import { format, addDays, subDays, isToday, startOfDay, isBefore } from 'date-fns';
import Card from './Card';

interface DatePickerProps {
    selectedDate: Date;
    onChange: (date: Date) => void;
    minDate?: Date;
    maxDate?: Date;
    label?: string;
}

export default function DatePicker({
    selectedDate,
    onChange,
    minDate = new Date(),
    maxDate = addDays(new Date(), 30),
    label = 'Select Date',
}: DatePickerProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    const canGoPrevious = !isBefore(subDays(selectedDate, 1), startOfDay(minDate));
    const canGoNext = isBefore(selectedDate, maxDate);

    const getDateLabel = () => {
        if (isToday(selectedDate)) return 'Today';
        const tomorrow = addDays(new Date(), 1);
        if (format(selectedDate, 'yyyy-MM-dd') === format(tomorrow, 'yyyy-MM-dd')) {
            return 'Tomorrow';
        }
        return format(selectedDate, 'EEEE');
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const date = new Date(e.target.value + 'T00:00:00');
        const today = startOfDay(minDate);
        onChange(isBefore(date, today) ? new Date() : date);
    };

    const handlePrevious = () => {
        if (canGoPrevious) onChange(subDays(selectedDate, 1));
    };

    const handleNext = () => {
        if (canGoNext) onChange(addDays(selectedDate, 1));
    };

    const openDatePicker = () => {
        if (inputRef.current) {
            // Use showPicker if available (modern browsers)
            if (typeof inputRef.current.showPicker === 'function') {
                inputRef.current.showPicker();
            } else {
                inputRef.current.click();
            }
        }
    };

    const arrowButtonStyle: React.CSSProperties = {
        width: '56px',
        height: '56px',
        borderRadius: '16px',
        backgroundColor: 'var(--color-primary-light)',
        color: 'var(--color-primary)',
        fontWeight: 'bold',
        fontSize: '20px',
        border: 'none',
        flexShrink: 0,
    };

    return (
        <Card>
            {label && (
                <div
                    style={{
                        fontSize: '12px',
                        fontWeight: 700,
                        color: 'var(--color-text-muted)',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        marginBottom: '20px',
                        textAlign: 'center',
                    }}
                >
                    {label}
                </div>
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <button
                    onClick={handlePrevious}
                    disabled={!canGoPrevious}
                    style={{
                        ...arrowButtonStyle,
                        opacity: !canGoPrevious ? 0.4 : 1,
                        cursor: !canGoPrevious ? 'not-allowed' : 'pointer',
                    }}
                >
                    ←
                </button>

                <div
                    onClick={openDatePicker}
                    style={{
                        flex: 1,
                        textAlign: 'center',
                        cursor: 'pointer',
                        padding: '8px',
                        borderRadius: '12px',
                        transition: 'background-color 0.2s',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--color-bg)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                >
                    <div
                        style={{
                            fontSize: '22px',
                            fontWeight: 700,
                            color: 'var(--color-text-primary)',
                        }}
                    >
                        {format(selectedDate, 'dd / MM / yyyy')}
                    </div>
                    <div
                        style={{
                            marginTop: '8px',
                            fontSize: '15px',
                            fontWeight: 600,
                            color: 'var(--color-primary)',
                        }}
                    >
                        {getDateLabel()}
                    </div>

                    {/* Hidden native input */}
                    <input
                        ref={inputRef}
                        type="date"
                        value={format(selectedDate, 'yyyy-MM-dd')}
                        min={format(minDate, 'yyyy-MM-dd')}
                        max={format(maxDate, 'yyyy-MM-dd')}
                        onChange={handleDateChange}
                        style={{
                            position: 'absolute',
                            opacity: 0,
                            pointerEvents: 'none',
                            width: 0,
                            height: 0,
                        }}
                    />
                </div>

                <button
                    onClick={handleNext}
                    disabled={!canGoNext}
                    style={{
                        ...arrowButtonStyle,
                        opacity: !canGoNext ? 0.4 : 1,
                        cursor: !canGoNext ? 'not-allowed' : 'pointer',
                    }}
                >
                    →
                </button>
            </div>
        </Card>
    );
}