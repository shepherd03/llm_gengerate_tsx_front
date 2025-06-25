import { useState, useEffect, useCallback } from 'react';
import { apiService } from '../services/api';
import type { Message, BackendResponse, FetchDataResponse } from '../types';

export const useDataAgentService = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [healthChecked, setHealthChecked] = useState<boolean>(false);
    const [healthCheckedResult, setHealthCheckedResult] = useState<boolean>(false);
    const [apiHealthy, setApiHealthy] = useState<boolean>(false);
    const [apiHealthyMsg, setApiHealthyMsg] = useState<string>('');
    const [apiHealthyError, setApiHealthyError] = useState<string>('');
    const [apiHealthySuccess, setApiHealthySuccess] = useState<boolean>(false);
    const [apiHealthyCode, setApiHealthyCode] = useState<number>(0);

} 