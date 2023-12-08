# Benchmark Cosmos Tools

## Get start

```bash
git clone https://github.com/DoraFactory/benchmark-cosmos-tools.git
cd benchmark-cosmos-tools/
pnpm i
pnpm run build
```

## How to use

```bash
$ ./dist/benchmarking.mjs benchmark --help                        
benchmarking benchmark

Benchmark cosmos tools

选项：
      --version  显示版本号                                                      [布尔]
      --repeat   Number of repetitions                           [数字] [默认值: 100]
      --thread   Number of accounts used for testing             [数字] [默认值: 100]
      --size     Quantity included in each transaction          [数字] [默认值: 1000]
  -h, --help     显示帮助信息                                                     [布尔]
```
