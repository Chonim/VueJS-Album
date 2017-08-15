<template>
	<div id="cards" class="container">

		<div>
			<input class="container col-sm-12" type="text" v-model="message">
			<!-- Plain view -->
			<div v-if="isCreate">
				<div class="button">
					<button type="button" class="btn btn-success" @click="createPost()">Create</button>
				</div>
			</div>
			<!-- Edit view -->
			<div v-else>
				<div class="button">
					<button type="button" class="btn btn-primary" @click="completeEdit()">Edit</button>
					<button type="button" class="btn btn-danger" @click="cancelEdit()">Cancel</button>
				</div>
			</div>
		</div>

		<div v-if="hasResult" class="container album">
      <div class="row">
        <div v-for="(post, index) in posts" class="posts card" v-if="index < maxLimit">
					<hr>
          <p class="options">
            <!-- Edit and delete function -->
            <a @click="editPost(post, index)"><span>Edit</span></a>
            <a @click="deletePost(index)"><span>Delete</span></a>
          </p>
          <h3 @click="showDetail(index)">{{post.title}}</h3>
          <p>No. {{post.id}}</p>
          <p>By {{post.userId}}</p>
          <img src="http://via.placeholder.com/350x65" @click="showDetail(index)" alt="">
        </div>
      </div>
			<div class="load-button-container">
				<button type="button" name="button" class="btn btn-default" @click="maxLimit += 10">Load 10 more</button>
			</div>
    </div>

	</div>
</template>

<script>
export default {
	data() {
		return {
			message: "",
			tempIndex: 0,
			maxLimit: 10,
			isCreate: true,
			posts: [],
			resource: {}
		};
	},
  computed: {
		// 실제 포스트가 있을 경우만 렌더링해주기 위한 설정
    hasResult: function () {
      return this.posts.length > 0
    }
  },
	methods: {
		// vue-resource를 사용하여 http 요청
		getPosts() {
			this.resource.get({})
			.then(response => {
				return response.json();
			})
			.then(data => {
				this.reverseOrder(data);
			});
		},
		// 최신 포스트부터 보여주기 위한 메소드
		reverseOrder(data) {
			this.posts = data.slice().reverse();
		},
		createPost() {
      let contents = this.message;
      if (contents !== "") {
        this.posts.unshift({
          id: this.posts.length + 1,
          title: contents,
          userId: "1004"
        });
        this.message = "";
      }
    },
		// 수정 모드로 전환
		editPost(post, index) {
			this.isCreate = false;
			this.tempIndex = index;
			this.message = post.title;

			document.body.scrollTop = 0; // For Chrome, Safari and Opera
			document.documentElement.scrollTop = 0; // For IE and Firefox
		},
		// 수정 완료시 실제 제목 변경
		completeEdit() {
			this.isCreate = true;
			this.posts[this.tempIndex].title = this.message;
			this.message = "";
			alert("Title editted successfully!")
		},
		// 수정 모드 취소시 작성모드로 복귀
		cancelEdit() {
			this.isCreate = !this.isCreate;
			this.message = "";
		},
		// 해당 인덱스의 배열 요소 삭제
		deletePost(index) {
			if (confirm("Do you really want do delete " + index +"?")) {
				this.posts.splice(index, 1);
			}
		},
		// 각 포스트 클릭시 간단한 해당 정보 보여줌
		showDetail(index) {
			alert("Index : " + index);
		}
	},
	// vue-resource 사용을 위한 설정
	created() {
		this.resource = this.$resource('');
	},
	// 페이지 로딩시 포스트를 가져옴
	mounted() {
		this.getPosts();
	}
};
</script>

<style>
.button {
  text-align: right;
}
h3, .options {
	margin: 0 !important;
}
input, img {
	width: 100%;
}
.load-button-container {
	margin-top: 30px;
	text-align: center;
}
</style>
