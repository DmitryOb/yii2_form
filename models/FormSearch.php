<?php

namespace app\models;

use yii\base\Model;
use yii\data\ActiveDataProvider;
use app\models\Form;


class FormSearch extends Form
{

    public function rules()
    {
        return [
            [['id'], 'integer'],
            [['request', 'name', 'phone', 'email', 'created', 'direction'], 'safe'],
        ];
    }

    public function scenarios()
    {
        return Model::scenarios();
    }

    public function search($params)
    {
        $query = Form::find();

        $dataProvider = new ActiveDataProvider([
            'query' => $query,
			'pagination' => [
				'forcePageParam' => false,
				'pageSizeParam' => false,
				'pageSize' => 10,
			],
			'sort' => [
				'defaultOrder' => [
					'created' => SORT_DESC,
				]
			],
        ]);

        $this->load($params);

        if (!$this->validate()) {
            return $dataProvider;
        }

        $query->andFilterWhere([
            'id' => $this->id,
            'created' => $this->created,
        ]);

        $query->andFilterWhere(['like', 'request', $this->request])
            ->andFilterWhere(['like', 'name', $this->name])
            ->andFilterWhere(['like', 'phone', $this->phone])
            ->andFilterWhere(['like', 'email', $this->email])
            ->andFilterWhere(['like', 'direction', $this->direction]);

        return $dataProvider;
    }
}