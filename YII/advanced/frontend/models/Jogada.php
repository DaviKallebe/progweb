<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "jogada".
 *
 * @property integer $id
 * @property integer $id_user
 * @property integer $pontuacao
 * @property string $data_hota
 *
 * @property Curso $idUser
 */
class Jogada extends \yii\db\ActiveRecord
{
    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return 'jogada';
    }

    /**
     * @inheritdoc
     */
    public function rules()
    {
        return [
            [['id_user', 'pontuacao', 'data_hota'], 'required', 'message'=>'Campo obrigatório'],
            [['id_user', 'pontuacao'], 'integer'],
            [['data_hota'], 'string', 'max' => 45],
            [['id_user'], 'exist', 'skipOnError' => true, 'targetClass' => Curso::className(), 'targetAttribute' => ['id_user' => 'id']],
        ];
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'id_user' => 'Id Usuário',
            'pontuacao' => 'Pontuação',
            'data_hota' => 'Data',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getIdUser()
    {
        return $this->hasOne(Curso::className(), ['id' => 'id_user']);
    }
}
