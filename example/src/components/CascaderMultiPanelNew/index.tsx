import React, { useState } from 'react';
import { CascaderMultiPanelNew } from '@learnbase/rslib';

import { originData } from './origin';

function Demo() {
  // 多选模式状态
  const [multipleValue, setMultipleValue] = useState(['xihu', 'tianhe']);

  // 单选模式状态
  const [singleValue, setSingleValue] = useState('xuanwu');

  // 禁用状态
  const [disabled, setDisabled] = useState(false);

  const handleMultipleChange = (newValue) => {
    console.log('多选值变化:', newValue);
    setMultipleValue(newValue);
  };

  const handleSingleChange = (newValue) => {
    console.log('单选值变化:', newValue);
    setSingleValue(newValue);
  };

  return (
    <div style={{ width: '100%', margin: '0 auto' }}>
      {/* 控制面板 */}
      <div style={{ marginBottom: '30px', padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <h3>控制面板</h3>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input type="checkbox" checked={disabled} onChange={(e) => setDisabled(e.target.checked)} />
          禁用状态
        </label>
      </div>

      {/* 多选模式 */}
      <div style={{ marginBottom: '40px' }}>
        <h2>多选模式 (默认)</h2>
        <p>当前选中值: {JSON.stringify(multipleValue)}</p>
        <CascaderMultiPanelNew
          options={originData}
          value={multipleValue}
          onChange={handleMultipleChange}
          placeholder="请选择地区..."
          multiple={true}
          disabled={disabled}
          maxTagCount={3}
          searchable={true}
        />
      </div>

      {/* 单选模式 */}
      <div style={{ marginBottom: '40px' }}>
        <h2>单选模式</h2>
        <p>当前选中值: {JSON.stringify(singleValue)}</p>
        <CascaderMultiPanelNew
          options={originData}
          value={singleValue}
          onChange={handleSingleChange}
          placeholder="请选择单个地区..."
          multiple={false}
          disabled={disabled}
          searchable={true}
        />
      </div>

      {/* 不可搜索模式 */}
      <div style={{ marginBottom: '40px' }}>
        <h2>不可搜索模式</h2>
        <p>当前选中值: {JSON.stringify(multipleValue)}</p>
        <CascaderMultiPanelNew
          options={originData}
          value={multipleValue}
          onChange={handleMultipleChange}
          multiple={true}
          disabled={disabled}
          searchable={false}
        />
      </div>

      {/* 自定义标签数量限制 */}
      <div style={{ marginBottom: '40px' }}>
        <h2>自定义标签数量限制 (最多显示2个)</h2>
        <p>当前选中值: {JSON.stringify(multipleValue)}</p>
        <CascaderMultiPanelNew
          options={originData}
          value={multipleValue}
          onChange={handleMultipleChange}
          placeholder="最多显示2个标签..."
          multiple={true}
          disabled={disabled}
          maxTagCount={2}
          searchable={true}
        />
      </div>
    </div>
  );
}

export default Demo;
