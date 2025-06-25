/**
 * 模拟数据服务
 * 用于在后端无法连接时提供模拟数据
 */

import type { CompleteBackendResponse, FetchDataResponse, MultiStepResponse } from '../types';


// 模拟数据展示响应
const mockDataDisplayResponse: FetchDataResponse = {
  operation_type: 'data_display',
  title: '河北省各地市停电计划数',
  result: [
    { "单位编码": "13414", "地市": "雄安", "数量": 8 },
    { "单位编码": "13405", "地市": "邢台", "数量": 100 },
    { "单位编码": "13401", "地市": "石家庄", "数量": 182 },
    { "单位编码": "13404", "地市": "衡水", "数量": 103 },
    { "单位编码": "13406", "地市": "保定", "数量": 237 },
    { "单位编码": "13407", "地市": "张家口", "数量": 156 },
    { "单位编码": "13408", "地市": "承德", "数量": 89 },
    { "单位编码": "13409", "地市": "沧州", "数量": 134 },
    { "单位编码": "13410", "地市": "廊坊", "数量": 67 },
    { "单位编码": "13411", "地市": "秦皇岛", "数量": 78 },
    { "单位编码": "13412", "地市": "唐山", "数量": 198 },
    { "单位编码": "13413", "地市": "邯郸", "数量": 145 }
  ]
};

// 模拟统计分析响应
const mockStatisticalAnalysisResponse: FetchDataResponse = {
  operation_type: 'statistical_analysis',
  title: '按地市和单位编码合并数据集',
  result: [
    { "单位编码": "13401", "地市": "石家庄", "数量_作业": 182, "数量_停电": 84 },
    { "单位编码": "13404", "地市": "衡水", "数量_作业": 103, "数量_停电": 58 },
    { "单位编码": "13405", "地市": "邢台", "数量_作业": 100, "数量_停电": 45 },
    { "单位编码": "13406", "地市": "保定", "数量_作业": 237, "数量_停电": 100 },
    { "单位编码": "13407", "地市": "张家口", "数量_作业": 156, "数量_停电": 72 },
    { "单位编码": "13408", "地市": "承德", "数量_作业": 89, "数量_停电": 41 },
    { "单位编码": "13409", "地市": "沧州", "数量_作业": 134, "数量_停电": 62 },
    { "单位编码": "13410", "地市": "廊坊", "数量_作业": 67, "数量_停电": 31 },
    { "单位编码": "13411", "地市": "秦皇岛", "数量_作业": 78, "数量_停电": 36 },
    { "单位编码": "13412", "地市": "唐山", "数量_作业": 198, "数量_停电": 91 }
  ],
  source: 'data_agent_outputs/generated_code_20250623_161219.py'
};

// 模拟可视化响应
const mockVisualizationResponse: FetchDataResponse = {
  operation_type: 'visualization',
  title: '各地市作业计划数排序',
  result: [
    { "单位编码": "13406", "地市": "保定", "数量_作业": 237 },
    { "单位编码": "13412", "地市": "唐山", "数量_作业": 198 },
    { "单位编码": "13401", "地市": "石家庄", "数量_作业": 182 },
    { "单位编码": "13407", "地市": "张家口", "数量_作业": 156 },
    { "单位编码": "13413", "地市": "邯郸", "数量_作业": 145 },
    { "单位编码": "13409", "地市": "沧州", "数量_作业": 134 },
    { "单位编码": "13404", "地市": "衡水", "数量_作业": 103 },
    { "单位编码": "13405", "地市": "邢台", "数量_作业": 100 },
    { "单位编码": "13408", "地市": "承德", "数量_作业": 89 },
    { "单位编码": "13411", "地市": "秦皇岛", "数量_作业": 78 }
  ],
  type: 'bar'
};

// 模拟多步任务响应 - 基础分析+柱状图
const mockMultiStepResponse: MultiStepResponse = {
  results: [
    {
      message: '统计分析已完成',
      operation_type: 'statistical_analysis',
      title: '各地市作业计划数排序',
      result: [
        { "单位编码": "13406", "地市": "保定", "数量_作业": 237, "数量_停电": 100 },
        { "单位编码": "13401", "地市": "石家庄", "数量_作业": 182, "数量_停电": 84 },
        { "单位编码": "13407", "地市": "张家口", "数量_作业": 156, "数量_停电": 72 },
        { "单位编码": "13409", "地市": "沧州", "数量_作业": 134, "数量_停电": 62 },
        { "单位编码": "13404", "地市": "衡水", "数量_作业": 103, "数量_停电": 58 },
        { "单位编码": "13405", "地市": "邢台", "数量_作业": 100, "数量_停电": 45 }
      ],
      source: 'data_agent_outputs/generated_code_20250623_161255.py'
    },
    {
      message: '可视化数据已准备好',
      operation_type: 'visualization',
      title: '各地市作业计划数排序',
      result: [
        { "单位编码": "13406", "地市": "保定", "数量_作业": 237 },
        { "单位编码": "13401", "地市": "石家庄", "数量_作业": 182 },
        { "单位编码": "13407", "地市": "张家口", "数量_作业": 156 },
        { "单位编码": "13409", "地市": "沧州", "数量_作业": 134 },
        { "单位编码": "13404", "地市": "衡水", "数量_作业": 103 },
        { "单位编码": "13405", "地市": "邢台", "数量_作业": 100 }
      ],
      type: 'bar'
    }
  ]
};

// 模拟多步任务响应 - 趋势分析+折线图
const mockTrendAnalysisResponse: MultiStepResponse = {
  results: [
    {
      message: '数据展示已完成',
      operation_type: 'data_display',
      title: '月度停电计划趋势数据',
      result: [
        { "月份": "1月", "停电计划数": 145 },
        { "月份": "2月", "停电计划数": 132 },
        { "月份": "3月", "停电计划数": 168 },
        { "月份": "4月", "停电计划数": 189 },
        { "月份": "5月", "停电计划数": 203 },
        { "月份": "6月", "停电计划数": 178 }
      ],
      source: 'data_agent_outputs/trend_analysis_20250623_162010.py'
    },
    {
      message: '统计分析已完成',
      operation_type: 'statistical_analysis',
      title: '月度趋势统计分析',
      result: [
        { "月份": "1月", "停电计划数": 145, "环比增长率": 0 },
        { "月份": "2月", "停电计划数": 132, "环比增长率": -8.97 },
        { "月份": "3月", "停电计划数": 168, "环比增长率": 27.27 },
        { "月份": "4月", "停电计划数": 189, "环比增长率": 12.50 },
        { "月份": "5月", "停电计划数": 203, "环比增长率": 7.41 },
        { "月份": "6月", "停电计划数": 178, "环比增长率": -12.32 }
      ],
      source: 'data_agent_outputs/trend_analysis_20250623_162015.py'
    },
    {
      message: '可视化图表已生成',
      operation_type: 'visualization',
      title: '月度停电计划趋势图',
      result: [
        { "月份": "1月", "停电计划数": 145 },
        { "月份": "2月", "停电计划数": 132 },
        { "月份": "3月", "停电计划数": 168 },
        { "月份": "4月", "停电计划数": 189 },
        { "月份": "5月", "停电计划数": 203 },
        { "月份": "6月", "停电计划数": 178 }
      ],
      type: 'line'
    }
  ]
};

// 模拟多步任务响应 - 分类统计+饼图
const mockCategoryAnalysisResponse: MultiStepResponse = {
  results: [
    {
      message: '数据分类统计已完成',
      operation_type: 'statistical_analysis',
      title: '停电原因分类统计',
      result: [
        { "停电原因": "设备检修", "计划数量": 456, "占比": 45.6 },
        { "停电原因": "线路改造", "计划数量": 234, "占比": 23.4 },
        { "停电原因": "设备更换", "计划数量": 189, "占比": 18.9 },
        { "停电原因": "应急抢修", "计划数量": 78, "占比": 7.8 },
        { "停电原因": "其他原因", "计划数量": 43, "占比": 4.3 }
      ],
      source: 'data_agent_outputs/category_analysis_20250623_162030.py'
    },
    {
      message: '分类占比可视化已完成',
      operation_type: 'visualization',
      title: '停电原因分布饼图',
      result: [
        { "停电原因": "设备检修", "计划数量": 456 },
        { "停电原因": "线路改造", "计划数量": 234 },
        { "停电原因": "设备更换", "计划数量": 189 },
        { "停电原因": "应急抢修", "计划数量": 78 },
        { "停电原因": "其他原因", "计划数量": 43 }
      ],
      type: 'pie'
    }
  ]
};

// 模拟复杂多步任务响应 - 完整数据分析流程
const mockComplexAnalysisResponse: MultiStepResponse = {
  results: [
    {
      message: '原始数据已加载',
      operation_type: 'data_display',
      title: '各地市年度停电计划汇总',
      result: [
        { "地市": "石家庄", "Q1": 45, "Q2": 52, "Q3": 48, "Q4": 37 },
        { "地市": "保定", "Q1": 62, "Q2": 58, "Q3": 65, "Q4": 52 },
        { "地市": "张家口", "Q1": 38, "Q2": 42, "Q3": 39, "Q4": 37 },
        { "地市": "唐山", "Q1": 51, "Q2": 49, "Q3": 53, "Q4": 45 },
        { "地市": "邯郸", "Q1": 36, "Q2": 41, "Q3": 38, "Q4": 30 }
      ],
      source: 'data_agent_outputs/complex_analysis_20250623_162045.py'
    },
    {
      message: '季度统计分析已完成',
      operation_type: 'statistical_analysis',
      title: '各地市季度停电计划统计',
      result: [
        { "地市": "石家庄", "年度总计": 182, "季度平均": 45.5, "最高季度": "Q2", "最低季度": "Q4" },
        { "地市": "保定", "年度总计": 237, "季度平均": 59.25, "最高季度": "Q3", "最低季度": "Q4" },
        { "地市": "张家口", "年度总计": 156, "季度平均": 39, "最高季度": "Q2", "最低季度": "Q4" },
        { "地市": "唐山", "年度总计": 198, "季度平均": 49.5, "最高季度": "Q3", "最低季度": "Q4" },
        { "地市": "邯郸", "年度总计": 145, "季度平均": 36.25, "最高季度": "Q2", "最低季度": "Q4" }
      ],
      source: 'data_agent_outputs/complex_analysis_20250623_162050.py'
    },
    {
      message: '年度总计柱状图已生成',
      operation_type: 'visualization',
      title: '各地市年度停电计划总计',
      result: [
        { "地市": "保定", "年度总计": 237 },
        { "地市": "唐山", "年度总计": 198 },
        { "地市": "石家庄", "年度总计": 182 },
        { "地市": "张家口", "年度总计": 156 },
        { "地市": "邯郸", "年度总计": 145 }
      ],
      type: 'bar'
    },
    {
      message: '季度趋势折线图已生成',
      operation_type: 'visualization',
      title: '各地市季度停电计划趋势',
      result: [
        { "季度": "Q1", "石家庄": 45, "保定": 62, "张家口": 38, "唐山": 51, "邯郸": 36 },
        { "季度": "Q2", "石家庄": 52, "保定": 58, "张家口": 42, "唐山": 49, "邯郸": 41 },
        { "季度": "Q3", "石家庄": 48, "保定": 65, "张家口": 39, "唐山": 53, "邯郸": 38 },
        { "季度": "Q4", "石家庄": 37, "保定": 52, "张家口": 37, "唐山": 45, "邯郸": 30 }
      ],
      type: 'line'
    }
  ]
};

// 模拟多步任务响应 - 作业计划数柱状图排序
const mockWorkPlanBarChartResponse: MultiStepResponse = {
  results: [
    {
      message: '统计分析已完成',
      operation_type: 'statistical_analysis',
      title: '各地市作业计划数排序',
      result: [
        { "单位编码": "13406", "地市": "保定", "数量_作业": 237, "数量_停电": 100 },
        { "单位编码": "13412", "地市": "唐山", "数量_作业": 198, "数量_停电": 91 },
        { "单位编码": "13401", "地市": "石家庄", "数量_作业": 182, "数量_停电": 84 },
        { "单位编码": "13407", "地市": "张家口", "数量_作业": 156, "数量_停电": 72 },
        { "单位编码": "13413", "地市": "邯郸", "数量_作业": 145, "数量_停电": 67 },
        { "单位编码": "13409", "地市": "沧州", "数量_作业": 134, "数量_停电": 62 },
        { "单位编码": "13404", "地市": "衡水", "数量_作业": 103, "数量_停电": 58 },
        { "单位编码": "13405", "地市": "邢台", "数量_作业": 100, "数量_停电": 45 },
        { "单位编码": "13408", "地市": "承德", "数量_作业": 89, "数量_停电": 41 },
        { "单位编码": "13411", "地市": "秦皇岛", "数量_作业": 78, "数量_停电": 36 }
      ],
      source: 'data_agent_outputs/generated_code_20250623_161255.py'
    },
    {
      message: '可视化数据已准备好',
      operation_type: 'visualization',
      title: '各地市作业计划数排序',
      result: [
        { "单位编码": "13406", "地市": "保定", "数量_作业": 237 },
        { "单位编码": "13412", "地市": "唐山", "数量_作业": 198 },
        { "单位编码": "13401", "地市": "石家庄", "数量_作业": 182 },
        { "单位编码": "13407", "地市": "张家口", "数量_作业": 156 },
        { "单位编码": "13413", "地市": "邯郸", "数量_作业": 145 },
        { "单位编码": "13409", "地市": "沧州", "数量_作业": 134 },
        { "单位编码": "13404", "地市": "衡水", "数量_作业": 103 },
        { "单位编码": "13405", "地市": "邢台", "数量_作业": 100 },
        { "单位编码": "13408", "地市": "承德", "数量_作业": 89 },
        { "单位编码": "13411", "地市": "秦皇岛", "数量_作业": 78 }
      ],
      type: 'bar'
    }
  ]
};

// 模拟多步任务响应 - 停电计划数占比饼图
const mockPowerOutagePieChartResponse: MultiStepResponse = {
  results: [
    {
      message: '统计分析已完成',
      operation_type: 'statistical_analysis',
      title: '各地市停电计划数占比',
      result: [
        { "占比(%)": "22.64%", "地市": "石家庄", "数量": 84 },
        { "占比(%)": "26.95%", "地市": "保定", "数量": 100 },
        { "占比(%)": "19.41%", "地市": "张家口", "数量": 72 },
        { "占比(%)": "24.52%", "地市": "唐山", "数量": 91 },
        { "占比(%)": "18.06%", "地市": "邯郸", "数量": 67 },
        { "占比(%)": "16.71%", "地市": "沧州", "数量": 62 },
        { "占比(%)": "15.63%", "地市": "衡水", "数量": 58 },
        { "占比(%)": "12.13%", "地市": "邢台", "数量": 45 },
        { "占比(%)": "11.05%", "地市": "承德", "数量": 41 },
        { "占比(%)": "9.70%", "地市": "秦皇岛", "数量": 36 }
      ],
      source: 'data_agent_outputs/generated_code_20250623_161331.py'
    },
    {
      message: '可视化数据已准备好',
      operation_type: 'visualization',
      title: '各地市停电计划数占比',
      result: [
        { "地市": "石家庄", "数量": 84 },
        { "地市": "保定", "数量": 100 },
        { "地市": "张家口", "数量": 72 },
        { "地市": "唐山", "数量": 91 },
        { "地市": "邯郸", "数量": 67 },
        { "地市": "沧州", "数量": 62 },
        { "地市": "衡水", "数量": 58 },
        { "地市": "邢台", "数量": 45 },
        { "地市": "承德", "数量": 41 },
        { "地市": "秦皇岛", "数量": 36 }
      ],
      type: 'pie'
    }
  ]
};

// 模拟数据服务类
export class MockDataService {
  /**
   * 模拟获取数据
   * @param userInput 用户输入
   * @returns 模拟的API响应
   */
  /**
   * 智能匹配用户意图
   * @param input 用户输入
   * @param keywords 关键词数组
   * @returns 匹配分数
   */
  private static calculateMatchScore(input: string, keywords: string[]): number {
    let score = 0;
    const inputLower = input.toLowerCase();

    for (const keyword of keywords) {
      if (inputLower.includes(keyword.toLowerCase())) {
        score += 1;
      }
    }

    return score;
  }

  /**
   * 检查是否包含任意关键词
   * @param input 用户输入
   * @param keywords 关键词数组
   * @returns 是否匹配
   */
  private static matchesAnyKeyword(input: string, keywords: string[]): boolean {
    const inputLower = input.toLowerCase();
    return keywords.some(keyword => inputLower.includes(keyword.toLowerCase()));
  }

  static async fetchData(userInput: string): Promise<CompleteBackendResponse> {
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    const input = userInput.toLowerCase();

    // 定义各类型的关键词模板
    const templates = {
      dataDisplay: {
        keywords: ['数据展示', '显示数据', '查看数据', '展示', '显示', '查看', '数据', '表格', '列表', '原始数据'],
        response: {
          code: 200,
          message: '数据获取成功',
          data: mockDataDisplayResponse
        }
      },
      statisticalAnalysis: {
        keywords: ['统计分析', '分析', '统计', '计算', '汇总', '求和', '平均', '最大', '最小', '合并'],
        response: {
          code: 200,
          message: '统计分析已完成',
          data: mockStatisticalAnalysisResponse
        }
      },
      visualization: {
        keywords: ['可视化', '图表', '柱状图', '折线图', '饼图', '散点图', '图', '绘制', '画图', '生成图表'],
        response: {
          code: 200,
          message: '可视化数据已准备好',
          data: mockVisualizationResponse
        }
      },
      multiStep: {
        keywords: ['多步', '综合', '多个步骤', '分步', '逐步', '先...再', '然后'],
        response: {
          code: 200,
          message: '多步任务执行全部成功',
          data: mockMultiStepResponse
        }
      },
      trendAnalysis: {
        keywords: ['趋势', '月度', '时间', '变化', '增长', '下降', '波动', '时序'],
        response: {
          code: 200,
          message: '趋势分析任务执行成功',
          data: mockTrendAnalysisResponse
        }
      },
      categoryAnalysis: {
        keywords: ['分类', '原因', '占比', '比例', '分布', '构成', '组成'],
        response: {
          code: 200,
          message: '分类分析任务执行成功',
          data: mockCategoryAnalysisResponse
        }
      },
      complexAnalysis: {
        keywords: ['复杂', '完整', '季度', '年度', '全面', '详细', '深入'],
        response: {
          code: 200,
          message: '复杂分析任务执行成功',
          data: mockComplexAnalysisResponse
        }
      },
      workPlanBarChart: {
        keywords: ['作业计划数', '作业计划', '柱状图', '排序', '地市作业', '作业数量'],
        response: {
          code: 200,
          message: '多步任务执行全部成功',
          data: mockWorkPlanBarChartResponse
        }
      },
      powerOutagePieChart: {
        keywords: ['停电计划数', '停电占比', '饼状图', '饼图', '占比', '停电计划'],
        response: {
          code: 200,
          message: '多步任务执行全部成功',
          data: mockPowerOutagePieChartResponse
        }
      }
    };

    // 计算每个模板的匹配分数
    const scores = Object.entries(templates).map(([type, template]) => ({
      type,
      score: this.calculateMatchScore(input, template.keywords),
      response: template.response
    }));

    // 找到最高分数的模板
    const bestMatch = scores.reduce((best, current) =>
      current.score > best.score ? current : best
    );

    // 特殊逻辑：多步任务需要同时包含分析和图表相关词汇
    if (this.matchesAnyKeyword(input, ['分析']) && this.matchesAnyKeyword(input, ['图表', '可视化', '图'])) {
      return templates.multiStep.response;
    }

    // 如果有匹配的关键词，返回最佳匹配
    if (bestMatch.score > 0) {
      return bestMatch.response;
    }

    // 默认返回数据展示
    return {
      code: 200,
      message: '数据获取成功',
      data: mockDataDisplayResponse
    };
  }

  /**
   * 模拟错误响应
   * @param errorType 错误类型
   * @returns 错误响应
   */
  static async fetchErrorData(errorType: 'param' | 'server' = 'param'): Promise<CompleteBackendResponse> {
    await new Promise(resolve => setTimeout(resolve, 500));

    if (errorType === 'param') {
      return {
        code: 400,
        message: '请求参数错误：缺少必要的数据文件路径',
        data: {
          operation_type: null,
          title: '',
          result: []
        } as any
      };
    }

    return {
      code: 500,
      message: '服务器内部错误：数据处理失败',
      data: {
        operation_type: null,
        title: '',
        result: []
      } as any
    };
  }

  /**
   * 获取示例提示词
   */
  static getExamplePrompts(): string[] {
    return [
      "计算停电计划数每个地市的占比，并按饼状图展示",
      "用柱状图的方式展示各地市作业计划数，并按作业计划数从高到低排序"
    ];
  }
}

export default MockDataService;