# 王权：新三国

《王权：新三国》首期工程基线，采用前后端分离结构：

- 前端：`Vue 3 + TypeScript + Vite`
- 后端：`Spring Boot 3 + Java 17 + Maven`
- 部署：`Nginx 托管前端 dist + 反向代理 Spring Boot`

## 目录结构

```text
.
├─ frontend/          # Vue 前端项目
├─ backend/           # Spring Boot 后端项目
└─ deploy/nginx/      # Nginx 示例配置
```

## 本地开发

### 1. 启动前端

```bash
cd frontend
npm install
npm run dev
```

前端默认地址：

- [http://localhost:5173](http://localhost:5173)

前端环境变量：

- `VITE_APP_TITLE`
- `VITE_API_BASE_URL`

开发环境默认通过 Vite 代理把 `/api` 转发到 `http://localhost:8080`。

### 2. 启动后端

```bash
cd backend
mvn spring-boot:run
```

后端默认地址：

- [http://localhost:8080/api/health](http://localhost:8080/api/health)
- [http://localhost:8080/api/system/info](http://localhost:8080/api/system/info)

后端默认激活 `dev` 配置，已预留 MySQL 连接项：

- `spring.datasource.url`
- `spring.datasource.username`
- `spring.datasource.password`
- `spring.datasource.driver-class-name`

当前版本未接入 ORM，也不会真正连库执行业务查询；这些配置用于后续数据库接入准备。

## 构建

### 前端构建

```bash
cd frontend
npm run build
```

产物输出到：

- `frontend/dist`

### 后端打包

```bash
cd backend
mvn clean package
```

产物输出到：

- `backend/target/backend-0.1.0.jar`

## 服务器部署

### 1. 部署前端

将 `frontend/dist` 上传到服务器静态目录，例如：

```text
/var/www/wangquan/frontend/dist
```

### 2. 部署后端

将 JAR 上传到服务器后运行：

```bash
java -jar backend-0.1.0.jar --spring.profiles.active=prod
```

生产环境可通过环境变量覆盖数据库与 CORS 配置：

- `DB_URL`
- `DB_USERNAME`
- `DB_PASSWORD`
- `APP_CORS_ALLOWED_ORIGIN`

### 3. 配置 Nginx

示例配置见：

- `deploy/nginx/wangquan.conf`

配置重点：

- `/` 返回前端静态资源
- `try_files` 回退到 `index.html`，保证 SPA 刷新不 404
- `/api/` 反向代理到 `127.0.0.1:8080`
- 开启 UTF-8、gzip 和基础静态缓存

## 工程说明

- 当前首页是一个框架验证页，用于验证响应式布局、主题基线和前后端联通
- 页面尺寸优先采用 `dvh / dvw / vh / vw` 与 `clamp()` 组织
- 后续可在现有 Router、Pinia、API 封装和后端统一返回体的基础上继续叠加游戏玩法

## 验证建议

前端：

- `npm run dev`
- `npm run build`
- 桌面端和移动端宽度下检查首页是否稳定显示

后端：

- `mvn test`
- `mvn clean package`
- 手动访问 `/api/health` 和 `/api/system/info`
