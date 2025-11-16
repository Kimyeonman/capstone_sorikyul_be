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
 *     summary: 자신의 라즈베리파이와 연결된 디바이스 로그 조회
 *     description: |
 *       로그인된 사용자의 serialNum(라즈베리파이 ID)을 기준으로  
 *       Type.resberry_id 와 일치하는 디바이스 로그만 조회합니다.  
 *       Noise + Type 정보를 포함하여 반환하며, 페이지네이션이 가능합니다.
 *
 *     tags: [Device]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - name: page
 *         in: query
 *         description: 페이지 번호
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *
 *       - name: limit
 *         in: query
 *         description: 한 페이지 당 출력 개수
 *         required: false
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
 *                                 example: 78
 *                               vibration:
 *                                 type: string
 *                                 example: "4095"
 *                               isNoise:
 *                                 type: boolean
 *                                 example: true
 *                               createdAt:
 *                                 type: string
 *                               updatedAt:
 *                                 type: string
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
 *         description: 인증 실패
 */
