import React from 'react';
import { ConfigProvider, Row, Col } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import { DatePickerWithToday } from '@learnbase/rslib';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

dayjs.locale('zh-cn');

export default function DatePickerWithTodayExample() {
  const value = '2024-07-16';

  const handleMonthChange = (date: unknown, dateString: string) => {
    console.log(`Selected month: ${date} - ${dateString}`);
  };

  const handleDateChange = (date: unknown, dateString: string) => {
    console.log(`Selected date: ${date} - ${dateString}`);
  };

  const handleWeekChange = (date: unknown, dateString: string) => {
    console.log(`Selected week: ${date} - ${dateString}`);
  };

  const handleQuarterChange = (date: unknown, dateString: string) => {
    console.log(`Selected quarter: ${date} - ${dateString}`);
  };

  const handleYearChange = (date: unknown, dateString: string) => {
    console.log(`Selected year: ${date} - ${dateString}`);
  };

  return (
    <ConfigProvider locale={zhCN}>
      <div>
        <Row>选择月份</Row>
        <Row justify="start">
          <Col span={24}>
            <DatePickerWithToday
              value={value}
              allowClear={true}
              todayText="至今"
              picker="month"
              placeholder="请选择月份"
              onChange={handleMonthChange}
            />
          </Col>
        </Row>
        <Row style={{ marginTop: 20 }}>选择日期</Row>
        <Row justify="start">
          <Col span={24}>
            <DatePickerWithToday
              allowClear={true}
              todayText="至今"
              picker="date"
              value={value}
              placeholder="请选择日期"
              onChange={handleDateChange}
            />
          </Col>
        </Row>
        <Row style={{ marginTop: 20 }}>选择周</Row>
        <Row justify="start">
          <Col span={24}>
            <DatePickerWithToday
              allowClear={true}
              todayText="至今"
              picker="week"
              value={value}
              placeholder="请选择周"
              onChange={handleWeekChange}
            />
          </Col>
        </Row>
        <Row style={{ marginTop: 20 }}>选择季度</Row>
        <Row justify="start">
          <Col span={24}>
            <DatePickerWithToday
              allowClear={true}
              todayText="至今"
              picker="quarter"
              value={value}
              placeholder="请选择季度"
              onChange={handleQuarterChange}
            />
          </Col>
        </Row>
        <Row style={{ marginTop: 20 }}>选择年</Row>
        <Row justify="start">
          <Col span={24}>
            <DatePickerWithToday
              allowClear={true}
              todayText="至今"
              picker="year"
              value={value}
              placeholder="请选择年"
              onChange={handleYearChange}
            />
          </Col>
        </Row>
      </div>
    </ConfigProvider>
  );
}
