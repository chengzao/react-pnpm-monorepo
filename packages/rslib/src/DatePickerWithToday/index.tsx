import React, { useState, forwardRef, Ref, useEffect } from 'react';
import { DatePicker, Input } from 'antd';
import { DatePickerProps } from 'antd/es/date-picker';
import { InputRef } from 'antd/lib/input';
import * as dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';

interface CustomInputProps {
  value: string;
  placeholder: string;
  onClick: () => void;
}

const CustomInput = forwardRef<InputRef, CustomInputProps>(
  ({ value, placeholder, onClick }, ref) => {
    return (
      <Input
        ref={ref}
        value={value}
        placeholder={placeholder}
        onClick={onClick}
        style={{ border: 'none', boxShadow: 'none' }}
      />
    );
  },
);

interface DatePickerWithTodayProps
  extends Omit<DatePickerProps, 'value' | 'onChange' | 'picker'> {
  value?: Dayjs | string | null;
  todayText?: string;
  todayTextColor?: string;
  picker?: 'date' | 'week' | 'month' | 'quarter' | 'year';
  isToday?: boolean;
  onChange?: (
    date: Dayjs | null,
    dateString: string,
    isToday?: boolean,
  ) => void;
}

const getQuarter = (date: Dayjs): number => {
  const month = date.month();
  return Math.floor(month / 3) + 1;
};

const DatePickerWithToday = (props: DatePickerWithTodayProps) => {
  const {
    value,
    disabled,
    allowClear,
    todayText = '至今',
    todayTextColor = '#2378e5',
    placeholder = '请选择时间',
    picker = 'date',
    isToday = false,
    onChange,
    ...restProps
  } = props;

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [dateValue, setDateValue] = useState<Dayjs | null>(null);

  useEffect(() => {
    const initValue = value
      ? typeof value === 'string'
        ? dayjs(value)
        : value
      : isToday
        ? dayjs()
        : null;
    handleChange(initValue, false);
  }, [value]);

  const handleToday = () => {
    setIsOpen(false);
    setInputValue(todayText);
    const today = dayjs(new Date());
    setDateValue(today);
    if (onChange) {
      onChange(today, todayText, true);
    }
  };

  const handleChangeDate = async (data: Dayjs | null) => {
    handleChange(data, true);
  };

  const handleChange = (
    data: Dayjs | null,
    isOnChange = true,
    clickIsToday = false,
  ) => {
    if (data) {
      let formattedDate;
      let nowDate;
      switch (picker) {
        case 'week':
          formattedDate = dayjs(data).format('YYYY-wo'); // 周
          nowDate = dayjs().format('YYYY-wo');
          break;
        case 'month':
          formattedDate = dayjs(data).format('YYYY-MM'); // 月
          nowDate = dayjs().format('YYYY-MM');
          break;
        case 'quarter':
          formattedDate = `${dayjs(data).year()}-Q${getQuarter(dayjs(data))}`; // 季度
          nowDate = `${dayjs().year()}-Q${getQuarter(dayjs(data))}`;
          break;
        case 'year':
          formattedDate = dayjs(data).format('YYYY'); // 年
          nowDate = dayjs().format('YYYY');
          break;
        default:
          formattedDate = dayjs(data).format('YYYY-MM-DD'); // 日期
          nowDate = dayjs().format('YYYY-MM-DD');
      }
      if (isToday && nowDate === formattedDate) {
        formattedDate = todayText;
      }
      setInputValue(formattedDate);
      setDateValue(data);
      if (onChange && isOnChange) {
        onChange(data, formattedDate, clickIsToday);
      }
      return;
    }
    setInputValue('');
    setDateValue(null);
    if (onChange && isOnChange) {
      onChange(null, '', clickIsToday);
    }
  };

  return (
    <DatePicker
      picker={picker}
      showNow={false}
      allowClear={allowClear}
      disabled={disabled}
      open={isOpen}
      onOpenChange={setIsOpen}
      renderExtraFooter={() => (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <span
            onClick={handleToday}
            style={{ cursor: 'pointer', color: todayTextColor }}
          >
            {todayText}
          </span>
        </div>
      )}
      onChange={handleChangeDate}
      value={dateValue}
      style={{ width: '100%' }}
      components={{
        input: forwardRef((props, ref) => (
          <CustomInput
            value={inputValue}
            ref={ref as Ref<InputRef>}
            placeholder={placeholder}
            onClick={() => setIsOpen(true)}
          />
        )),
      }}
      {...restProps}
    />
  );
};

export default DatePickerWithToday;
