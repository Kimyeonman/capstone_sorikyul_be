/**
 * @swagger
 * components:
 *   schemas:
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         error:
 *           type: object
 *           properties:
 *             code:
 *               type: string
 *               description: 에러 코드
 *             message:
 *               type: string
 *               description: 에러 메시지
 */

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: 사용자 인증 API (시딩 데이터 기반)
 */

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: 회원가입
 *     description: |
 *       새로운 사용자를 등록합니다.  
 *       사용자가 입력하는 `serialNum`은 반드시 **미리 등록된 라즈베리파이 ID**여야 합니다.
 * 
 *       🔹 현재 시스템에 등록된 라즈베리파이 ID (시딩 데이터 기준)
 *       - A1B2C3D4E5F6  
 *       - Z9Y8X7W6V5U4
 *
 *       ❗ admin 계정은 serial_num="admin" 으로 시딩되어 있습니다.
 * 
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - nickName
 *               - serialNum
 *             properties:
 *               email:
 *                 type: string
 *                 example: "newuser@example.com"
 *               password:
 *                 type: string
 *                 example: "newpass1234"
 *               nickName:
 *                 type: string
 *                 example: "새유저"
 *               serialNum:
 *                 type: string
 *                 description: 유저가 등록된 라즈베리파이 기기 ID
 *                 example: "A1B2C3D4E5F6"
 *     responses:
 *       201:
 *         description: 회원가입 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         userId:
 *                           type: string
 *                           example: "uuid"
 *                         email:
 *                           type: string
 *                           example: "newuser@example.com"
 *                         nickName:
 *                           type: string
 *                           example: "새유저"
 *                         serialNum:
 *                           type: string
 *                           example: "A1B2C3D4E5F6"
 *                         role:
 *                           type: string
 *                           example: "USER"
 *                     accessToken:
 *                       type: string
 *                     refreshToken:
 *                       type: string
 *       409:
 *         description: 중복 또는 잘못된 serialNum
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               invalidSerial:
 *                 summary: 존재하지 않는 라즈베리파이 ID
 *                 value:
 *                   success: false
 *                   error:
 *                     code: "INVALID_RPI_ID"
 *                     message: "해당 라즈베리파이 ID(BADID123)는 존재하지 않습니다."
 *               emailDuplicate:
 *                 summary: 이메일 중복
 *                 value:
 *                   success: false
 *                   error:
 *                     code: "DUPLICATE_EMAIL"
 *                     message: "이메일 'user1@test.com'은 이미 등록되어 있습니다."
 *               nickDuplicate:
 *                 summary: 닉네임 중복
 *                 value:
 *                   success: false
 *                   error:
 *                     code: "DUPLICATE_NICKNAME"
 *                     message: "닉네임은 이미 사용 중입니다."
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: 로그인
 *     description: |
 *       이메일과 비밀번호로 로그인합니다.  
 *       아래는 시딩된 사용자 정보입니다:
 * 
 *       🔹 Admin  
 *       - email: admin@test.com  
 *       - password: admin123!  
 *
 *       🔹 User1  
 *       - email: user1@test.com  
 *       - password: user1234!  
 *
 *       🔹 User2  
 *       - email: user2@test.com  
 *       - password: user1234!  
 *
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user1@test.com"
 *               password:
 *                 type: string
 *                 example: "user1234!"
 *     responses:
 *       200:
 *         description: 로그인 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: string
 *                     email:
 *                       type: string
 *                       example: "user1@test.com"
 *                     nickName:
 *                       type: string
 *                       example: "유저1"
 *                     role:
 *                       type: string
 *                       example: "USER"
 *                     accessToken:
 *                       type: string
 *                     refreshToken:
 *                       type: string
 *       401:
 *         description: 인증 실패
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *             examples:
 *               wrongPassword:
 *                 summary: 비밀번호 불일치
 *                 value:
 *                   success: false
 *                   error:
 *                     code: "INVALID_PASSWORD"
 *                     message: "비밀번호가 올바르지 않습니다."
 *               noUser:
 *                 summary: 사용자 없음
 *                 value:
 *                   success: false
 *                   error:
 *                     code: "USER_NOT_FOUND"
 *                     message: "사용자를 찾을 수 없습니다."
 */

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: 로그아웃
 *     description: Refresh Token 기반 로그아웃
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: 로그아웃 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "로그아웃 완료"
 *       400:
 *         description: Refresh Token 없음
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Refresh Token 유효하지 않음
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
