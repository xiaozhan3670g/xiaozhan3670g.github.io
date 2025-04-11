'use client';

import { useState, useEffect } from 'react';
import PageContainer from "@/components/PageContainer";

export default function TimestampConverter() {
  const [timestamp, setTimestamp] = useState('');
  const [datetime, setDatetime] = useState('');
  const [timezone, setTimezone] = useState('Asia/Shanghai');
  const [currentTimestamp, setCurrentTimestamp] = useState('');
  const [timezones, setTimezones] = useState([]); // 延迟加载时区列表

  // 更新当前时间戳
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTimestamp(Math.floor(Date.now() / 1000).toString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 延迟加载时区列表
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setTimezones(
        Intl.supportedValuesOf('timeZone').map((tz) => ({
          label: tz,
          value: tz,
        }))
      );
    }
  }, []);

  // 自动判断时间戳是秒还是毫秒
  const detectTimestampType = (ts) => {
    return ts.length > 10 ? 1 : 1000; // 毫秒需要乘以1，秒需要乘以1000
  };

  // 时间戳转日期时间
  const convertTimestampToDatetime = (ts) => {
    if (!ts) {
      setDatetime('');
      return;
    }
    try {
      const multiplier = detectTimestampType(ts); // 自动判断时间戳类型
      const date = new Date(parseInt(ts) * multiplier);
      if (isNaN(date.getTime())) {
        setDatetime('');
        return;
      }

      const options = {
        timeZone: timezone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };

      const parts = new Intl.DateTimeFormat('zh-CN', options).formatToParts(date);
      const valueMap = parts.reduce((acc, part) => {
        acc[part.type] = part.value;
        return acc;
      }, {});

      const formattedDatetime = `${valueMap.year}-${valueMap.month}-${valueMap.day}T${valueMap.hour}:${valueMap.minute}:${valueMap.second}`;
      setDatetime(formattedDatetime);
    } catch (error) {
      setDatetime('');
    }
  };

  // 日期时间转时间戳
  const convertDatetimeToTimestamp = (dt) => {
    if (!dt) {
      setTimestamp('');
      return;
    }
    try {
      const date = new Date(dt);
      if (isNaN(date.getTime())) {
        setTimestamp('');
        return;
      }

      // 使用指定时区计算时间戳
      const utcDate = new Date(
        date.toLocaleString('en-US', { timeZone: timezone })
      );
      setTimestamp(Math.floor(utcDate.getTime() / 1000).toString()); // 转换为秒
    } catch (error) {
      setTimestamp('');
    }
  };

  return (
    <PageContainer>
      <h1 className="text-2xl font-bold mb-6">Unix 时间戳转换器</h1>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="mb-6">
          <div className="text-sm text-gray-600 mb-2">当前时间戳</div>
          <div
            className="text-xl font-mono cursor-pointer hover:text-blue-600"
            onClick={() => {
              setTimestamp(currentTimestamp);
              convertTimestampToDatetime(currentTimestamp);
            }}
          >
            {currentTimestamp}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              时间戳
            </label>
            <input
              type="text"
              value={timestamp}
              onChange={(e) => {
                setTimestamp(e.target.value);
              }}
              className="w-full p-2 border rounded-md"
              placeholder="输入时间戳"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              时区
            </label>
            <select
              value={timezone}
              onChange={(e) => {
                setTimezone(e.target.value);
              }}
              className="w-full p-2 border rounded-md"
            >
              {timezones.map((tz) => (
                <option key={tz.value} value={tz.value}>
                  {tz.label}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <button
              onClick={() => convertTimestampToDatetime(timestamp)}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
            >
              转换
            </button>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              日期时间
            </label>
            <input
              type="datetime-local"
              value={datetime}
              onChange={(e) => {
                setDatetime(e.target.value);
                convertDatetimeToTimestamp(e.target.value);
              }}
              className="w-full p-2 border rounded-md"
            />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">什么是 Unix 时间戳？</h2>
        <div className="prose">
          <p className="mb-4">
            Unix 时间戳（Unix Timestamp）是一个自 1970 年 1 月 1 日 00:00:00 UTC 以来经过的秒数。
            它被广泛用于计算机系统和编程中，用于表示特定的时间点。
          </p>
          <p className="mb-4">优点：</p>
          <ul className="list-disc pl-5 mb-4">
            <li>与时区无关，便于在不同系统间传递时间信息</li>
            <li>数字格式，便于比较和计算时间差</li>
            <li>使用单一数值表示完整的日期时间信息</li>
          </ul>
          <p>
            注意：大多数系统使用 32 位整数存储时间戳，这会导致在 2038 年 1 月 19 日达到最大值（称为 2038 年问题）。
            因此，现代系统普遍采用 64 位整数来避免这个问题。
          </p>
        </div>
      </div>
    </PageContainer>
  );
}