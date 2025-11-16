/**
 * @swagger
 * tags:
 *   name: Device
 *   description: 디바이스 및 센서 데이터 조회 API
 */

/**
 * @swagger
 * /api/device/list:
 *   get:
 *     summary: 디바이스 로그 조회
 *     description: >
 *       **사용자(User)**는 자신의 serial_num(라즈베리파이 ID)에 해당하는 디바이스 로그만 조회할 수 있습니다.  
 *       **관리자(Admin)**는 `serialNum` 쿼리 파라미터를 통해 아무 기기나 선택하여 조회할 수 있습니다.
 *
 *     tags: [Device]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - name: serialNum
 *         in: query
 *         required: false
 *         description: "관리자(Admin) 전용. 조회하려는 라즈베리파이 기기 ID"
 *         schema:
 *           type: string
 *           example: "A1B2C3D4E5F6"
 *
 *       - name: page
 *         in: query
 *         required: false
 *         description: "페이지 번호 (기본값: 1)"
 *         schema:
 *           type: integer
 *           default: 1
 *
 *       - name: limit
 *         in: query
 *         required: false
 *         description: "한 페이지 당 데이터 수 (기본값: 10)"
 *         schema:
 *           type: integer
 *           default: 10
 *
 *     responses:
 *       200:
 *         description: 디바이스 데이터 조회 성공
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
 *                     list:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           deviceId:
 *                             type: string
 *                             example: "uuid-device-id"
 *                           type:
 *                             type: object
 *                             properties:
 *                               typeId:
 *                                 type: string
 *                                 example: "uuid-type-id"
 *                               noiseTypes:
 *                                 type: string
 *                                 example: "Washing machine running"
 *                               resberryId:
 *                                 type: string
 *                                 example: "A1B2C3D4E5F6"
 *                           noise:
 *                             type: object
 *                             properties:
 *                               noiseId:
 *                                 type: string
 *                                 example: "uuid-noise-id"
 *                               dba:
 *                                 type: integer
 *                                 example: 65
 *                               vibration:
 *                                 type: string
 *                                 example: "4095"
 *                               isNoise:
 *                                 type: boolean
 *                                 example: false
 *                               createdAt:
 *                                 type: string
 *                                 example: "2025-01-01T12:00:00.000Z"
 *                               updatedAt:
 *                                 type: string
 *                                 example: "2025-01-01T12:00:00.000Z"
 *                           createdAt:
 *                             type: string
 *                             example: "2025-01-01T12:00:00.000Z"
 *                           updatedAt:
 *                             type: string
 *                             example: "2025-01-01T12:00:00.000Z"
 *                     pagination:
 *                       type: object
 *                       properties:
 *                         totalCount:
 *                           type: integer
 *                           example: 25
 *                         page:
 *                           type: integer
 *                           example: 1
 *                         limit:
 *                           type: integer
 *                           example: 10
 *                         totalPages:
 *                           type: integer
 *                           example: 3
 *
 *       401:
 *         description: 인증 실패 — AccessToken 없음 또는 잘못됨
 *       403:
 *         description: 관리자만 serialNum 직접 지정 가능
 *       500:
 *         description: 서버 오류
 */
