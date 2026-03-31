'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';

export interface LogEntry {
  id: string;
  timestamp: string;
  level: 'info' | 'warn' | 'error' | 'success';
  message: string;
  type: 'api' | 'db' | 'infra' | 'system';
}

export interface SystemMetrics {
  latency: number;
  requestsPerSecond: number;
  errorRate: number;
  uptime: string;
  cpuUsage: number;
  memoryUsage: number;
  networkTraffic: number;
}

export interface ServiceStatus {
  name: string;
  status: 'online' | 'degraded' | 'offline';
  latency: number;
  lastChecked: string;
}

const LOG_MESSAGES = [
  { message: 'GET /notes 200 OK', level: 'success', type: 'api' },
  { message: 'POST /auth/login 200 OK', level: 'success', type: 'api' },
  { message: 'Slow query detected in notes_db', level: 'warn', type: 'db' },
  { message: 'HPA scaling up pod notes-api-7f', level: 'info', type: 'infra' },
  { message: 'Connection pool saturated - retrying', level: 'warn', type: 'db' },
  { message: 'Kubernetes node affinity reached', level: 'info', type: 'infra' },
  { message: 'Auth token validated successfully', level: 'info', type: 'api' },
  { message: 'Database backup synchronized', level: 'success', type: 'db' },
  { message: 'Latency spike detected in us-east-1', level: 'error', type: 'system' },
  { message: 'Prometheus scraping intervals aligned', level: 'info', type: 'system' },
  { message: 'GET /api/v1/health 200 OK', level: 'success', type: 'api' },
  { message: 'Pod notes-worker-3a restarted', level: 'warn', type: 'infra' },
];

export function useSystemData() {
  const [metrics, setMetrics] = useState<SystemMetrics>({
    latency: 120,
    requestsPerSecond: 45,
    errorRate: 0.02,
    uptime: '99.99%',
    cpuUsage: 42,
    memoryUsage: 68,
    networkTraffic: 245,
  });

  const [logs, setLogs] = useState<LogEntry[]>([]);
  
  const [services, setServices] = useState<ServiceStatus[]>([
    { name: 'Notes API', status: 'online', latency: 45, lastChecked: 'Just now' },
    { name: 'Auth Service', status: 'online', latency: 32, lastChecked: 'Just now' },
    { name: 'Database', status: 'online', latency: 5, lastChecked: 'Just now' },
    { name: 'Jenkins', status: 'online', latency: 12, lastChecked: 'Just now' },
    { name: 'K8s Cluster', status: 'online', latency: 8, lastChecked: 'Just now' },
  ]);

  // Stable metrics update
  const updateMetrics = useCallback(() => {
    setMetrics(prev => ({
      latency: Math.max(80, Math.min(250, prev.latency + (Math.random() * 20 - 10))),
      requestsPerSecond: Math.max(30, Math.min(100, prev.requestsPerSecond + (Math.random() * 10 - 5))),
      errorRate: Math.max(0.01, Math.min(0.05, prev.errorRate + (Math.random() * 0.01 - 0.005))),
      uptime: '99.9%',
      cpuUsage: Math.max(30, Math.min(95, prev.cpuUsage + (Math.random() * 10 - 5))),
      memoryUsage: Math.max(40, Math.min(90, prev.memoryUsage + (Math.random() * 4 - 2))),
      networkTraffic: Math.max(100, Math.min(800, prev.networkTraffic + (Math.random() * 50 - 25))),
    }));
  }, []);

  // Stable services latency update
  const updateServices = useCallback(() => {
    setServices(prev => prev.map(s => ({
      ...s,
      latency: Math.max(5, Math.floor(s.latency + (Math.random() * 8 - 4)))
    })));
  }, []);

  // Stable log addition
  const addLog = useCallback(() => {
    const template = LOG_MESSAGES[Math.floor(Math.random() * LOG_MESSAGES.length)];
    const newLog: LogEntry = {
      id: Math.random().toString(36).substring(7),
      timestamp: new Date().toLocaleTimeString(),
      message: template.message,
      level: template.level as any,
      type: template.type as any,
    };

    setLogs(prev => {
      const updated = [...prev, newLog];
      return updated.slice(-25); // Keep last 25 logs
    });
  }, []);

  useEffect(() => {
    // Initial logs
    const initialLogs: LogEntry[] = Array.from({ length: 10 }).map((_, i) => {
        const template = LOG_MESSAGES[Math.floor(Math.random() * LOG_MESSAGES.length)];
        return {
            id: `init-${i}`,
            timestamp: new Date(Date.now() - (10 - i) * 5000).toLocaleTimeString(),
            message: template.message,
            level: template.level as any,
            type: template.type as any,
        };
    });
    setLogs(initialLogs);

    const metricsInterval = setInterval(updateMetrics, 4000);
    const servicesInterval = setInterval(updateServices, 2500);
    const logsInterval = setInterval(addLog, 2500);

    return () => {
      clearInterval(metricsInterval);
      clearInterval(servicesInterval);
      clearInterval(logsInterval);
    };
  }, [updateMetrics, updateServices, addLog]);

  return useMemo(() => ({
    metrics,
    logs,
    services
  }), [metrics, logs, services]);
}
